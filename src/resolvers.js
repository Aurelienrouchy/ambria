const { ApolloError } = require('apollo-server');

const User = require('./database/models/User');
const Lead = require('./database/models/Lead');
const Favorite = require('./database/models/Favorite');

const authenticateWithPassportJS = require('./helpers/passport');

const asyncWrapper = (func, ...args) => {
    // if (!args[2].user) {
    //     return new ApolloError(`Not logged.`);
    // }
    try {
        return func(...args)
    } catch(err) {
        return new ApolloError(`Error server: ${err}`);
    }
}

const Query = {
    signIn: async (_, { token, provider }) => {
        req.body = {
            ...req.body,
            access_token: token,
        };

        const { profile, accessToken } = await authenticateWithPassportJS(req, res, provider);

        if (!profile) {
            return new ApolloError(`Connection with ${provider} fail`);
        }
        
        const user = await User.find({'providerId': profile.id});

        if (!user) {
            return new ApolloError(`No user found.`);
        };

        return user;
    },
    getUserById: async (_, { id }) => {
        const user = await User.findById(id);
        if (!user) {
            return new ApolloError(`The user with the id ${id} does not exist.`);
        }
        return user;
    },
    getFavorites: async (_, { input = [] }) => {
        if (!input.length) return new ApolloError(`No favorites to search.`);
        const res = input.map(async favoriteId => {
            try {
                return await Favorite.findById(favoriteId);
            }
            catch(err) {
                return {
                    name: 'Not Found'
                }
            }
        });
        
        return res;
    },
    search: async (_, { input }) => {
        const pageSize = input.pageSize || 25;
        const currentPage = input.current || 0;

        delete input.pageSize;
        delete input.current;

        if (!Object.keys(input).length) {
            return new ApolloError(`No filters.`);
        }
        const results = await Lead.find(input).skip(pageSize * currentPage).limit(pageSize);
        const count = await Lead.find(input).countDocuments();

        return {
            count,
            results,
            pageSize,
            currentPage
        };
    },
    getTotalLeadCount: async () => await Lead.countDocuments(),
    getCountOfSearch: async (_, { input }) => await Lead.find(input).countDocuments(),
};

const Mutation = {
    signUp: async (_, { input }) => {
        req.body = {
            ...req.body,
            access_token: input.token,
        };
        const { profile, accessToken } = await authenticateWithPassportJS(req, res, input.provider);

        if (!profile) {
            return new ApolloError(`Connection with ${input.provider} fail`);
        }

        const user = await User.create({
            'providerId': profile.id,
            'lname': input.lname,
            'fname': input.fname,
            'email': input.email,
            'provider': input.provider,
        });

        return user;
    },
    setLead: async (_, { input }) => {
        const _id = input.id || 000;
        delete input.id;
        if (!input) {
            return new ApolloError('No lead to add')
        }
        const lead = await Lead.updateOne({ _id }, input, {new: true});
        console.log(lead)
        return lead;
    },
    setFavorite: async (_, { input }) => {
        const name = input.name || '';
        delete input.name;

        const count = await Lead.find(input).countDocuments();
        const res = await Favorite.create({...input, name, count});
        
        return res;
    },
    updateFavorite: async (_, { input }) => {
        const favorite = await Favorite.findById(input.id);
        
        if (!favorite) {
            return new ApolloError('Favorite not found');
        }
        return await Favorite.findByIdAndUpdate({ _id: input.id }, input, { new: true });
    },
    buyFavorite: async (_, { id }) => {
        const favorite = await Favorite.findById(id);

        if (!favorite) {
            return new ApolloError('Favorite not found');
        }

    }
};

let resolvers = Object.create({});

[{name: 'Query', obj: Query}, {name: 'Mutation', obj: Mutation}].forEach(({name, obj}) => {
    Object.defineProperty(resolvers, name, {
        value: Object.keys(obj).reduce((acc, cur) => ({...acc, [cur]: (...args) => asyncWrapper(obj[cur], ...args)}), {}),
        writable: false,
        configurable: false,
        enumerable: true
    });
});

module.exports = resolvers;