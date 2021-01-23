const axios = require("axios");

const { 
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLBoolean, 
    GraphQLList, 
    GraphQLSchema,
    GraphQLEnumType
}= require('graphql');

const SpecificRocket = new GraphQLEnumType({
    name: 'Rockets',
    values: {
        FALCON1: {
            value: 'falcon1'
        },
        FALCONHEAVY: {
            value: 'falcon_heavy'
        }
    }
})

const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt},
        mission_name: { type: GraphQLString},
        launch_year: { type: GraphQLString},
        launch_date_local: { type: GraphQLString},
        launch_sucess: { type: GraphQLBoolean},
        rocket: { type: RocketType},
    })
})

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString},
        rocket_name: { type: GraphQLString},
        rocket_type: { type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launch: { 
            type: LaunchType,
            args: { 
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`).then(res => 
                    res.data
                );
            } 
        },
        launches: { 
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/launches').then(res => 
                    res.data
                );
            } 
        },
        rocket: {
            type: RocketType, 
            args: {
                rocket_id: { type: SpecificRocket }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.rocket_id}`).then(res =>
                    res.data
                );
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})