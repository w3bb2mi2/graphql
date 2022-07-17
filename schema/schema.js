const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const Movies = require('../models/movie');
const Directors = require('../models/directors');

/*
// All IDs set automatically by mLab
// Don't forget to update after creation
const directorsJson = [
  { "name": "Quentin Tarantino", "age": 55 }, // 5c84c9a3fb6fc0720131f9af
  { "name": "Michael Radford", "age": 72 }, // 5c84caebfb6fc0720131f9e4
  { "name": "James McTeigue", "age": 51 }, // 5c84cb24fb6fc0720131f9e8
  { "name": "Guy Ritchie", "age": 50 }, // 5c84cb45fb6fc0720131f9ed
];

// directorId - it is ID from the directors collection
const moviesJson = [
  { "name": "Pulp Fiction", "genre": "Crime", "directorId": "5c84c9a3fb6fc0720131f9af" },
  { "name": "1984", "genre": "Sci-Fi", "directorId": "5c84caebfb6fc0720131f9e4" },
  { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "5c84cb24fb6fc0720131f9e8" },
  { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "5c84cb45fb6fc0720131f9ed" },
  { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "5c84c9a3fb6fc0720131f9af" },
  { "name": "The Hateful Eight", "genre": "Crime", "directorId": "5c84c9a3fb6fc0720131f9af" },
  { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "5c84c9a3fb6fc0720131f9af" },
  { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "5c84cb45fb6fc0720131f9ed" },
];

const movies = [
  { id: '1', name: "Pulp Fiction", genre: "Crime", directorId: "1" },
  { id: '2', name: "1984", genre: "Sci-Fi", directorId: "2" },
  { id: '3', name: "V for vendetta", genre: "Sci-Fi-Triller", directorId: "3" },
  { id: '4', name: "Snatch", genre: "Crime-Comedy", directorId: "4" },
  { id: '5', name: "Reservoir Dogs", genre: "Crime", directorId: "1" },
  { id: '6', name: "The Hateful Eight", genre: "Crime", directorId: "1" },
  { id: '7', name: "Inglourious Basterds", genre: "Crime", directorId: "1" },
  { id: '8', name: "Lock, Stock and Two Smoking Barrels", genre: "Crime-Comedy", directorId: "4" },
];

const directors = [
	{ id: '1', name: "Quentin Tarantino", age: 55 },
  { id: '2', name: "Michael Radford", age: 72 },
  { id: '3', name: "James McTeigue", age: 51 },
  { id: '4', name: "Guy Ritchie", age: 50 },
];
*/

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
		director: {
			type: DirectorType,
			resolve(parent, args) {
				// return directors.find(director => director.id === parent.id);
				return Directors.findById(parent.directorId);
			}
		}
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				// return movies.filter(movie => movie.directorId === parent.id);
				return Movies.find({ directorId: parent.id });
			},
		},
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.find(movie => movie.id === args.id);
				//return Movies.findById(args.id);
				return Movies.findById(args.id);
      },
    },
		director: {
      type: DirectorType,
      //args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find(director => director.id === args.id);
				return Directors.findById(args.id);
      },
    },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				// return movies;
				return Movies.find({});
			}
		},
		directors: {
			type: new GraphQLList(DirectorType),
			resolve(parent, args) {
				// return directors;
        console.log(Directors.find({}))
				return Directors.find({});
			}
		}
  }
});

module.exports = new GraphQLSchema({
  query: Query,
});