const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');
const url = 'http://localhost:3000/customers/';
//Hardcoded Data
// const customers = [
//     {id: '1', name: 'Remy Nguyen', email: 'remynguyen@gmail.com', age: '21'},
//     {id: '2', name: 'Chau Nguyen', email: 'chaunguyen@gmail.com', age: '22'},
//     {id: '3', name: 'Mark Remy', email: 'markremy@gmail.com', age: '23'},
//     {id: '4', name: 'Chau', email: 'chau@gmail.com', age: '24'}
// ];

//Customer Type
const CustomerType = new GraphQLObjectType({
   name: 'customer',
   fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
});
//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
            //     for (let i= 0; i<= customers.length; i++ ) {
            //         if(customers[i].id === args.id) {
            //             return customers[i];
            //         }
            //     }
                return axios.get(url + args.id)
                    .then(res => res.data);
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                // return customers;
                return axios.get(url)
                    .then(res => res.data);
            }
        }
    }
});


//  Mutations
const mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields:{
       addCustomers: {
           type: CustomerType,
           args: {
               name: {type: GraphQLString},
               age: {type: GraphQLInt},
               email: {type: GraphQLString},
           },
           resolve(parentValue, args) {
               return axios.post(url, {
                  name:  args.name,
                  email:  args.email,
                  age:  args.age,
               }).then(res => res.data);
           }
       },
       deleteCustomers: {
           type: CustomerType,
           args: {
               id: {type: new GraphQLNonNull(GraphQLString)}
           },
           resolve(parentValue, args) {
               return axios.delete(url + args.id).then(res => res.data);
           }
       },
       editCustomers: {
            type: CustomerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parentValue, args) {
                return axios.patch(url + args.id, args).then(res => res.data);
            }
       }
   }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});