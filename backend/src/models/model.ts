import sequelize from './db';
import {DataTypes} from 'sequelize';
import {TokenInstance} from './types/Token';
import {UserInstance} from './types/User';
import {PermissionInstance} from './types/Permission';
import {RoleInstance} from './types/Role';
import {ProductInCartInstance} from './types/ProductInCart';
import {ProductInstance} from './types/Product';
import {TypeInstance} from './types/Type';
import {BrandInstance} from './types/Brand';
import {CityInstance} from './types/City';
import {MarketInstance} from './types/Market';
import {ProductToMarketInstance} from './types/ProductToMarket';
import {BrandTypeInstance} from './types/BrandType';
import {PermissionToRoleInstance} from './types/PermissionToRole';



const Token = sequelize.define<TokenInstance>('token', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	token: {
		type: DataTypes.STRING,
		allowNull: false
	},
	ip: {
		type: DataTypes.STRING
	},
	browser: {
		type: DataTypes.STRING
	},
});

const User = sequelize.define<UserInstance>('user', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
});

const Permission = sequelize.define<PermissionInstance>('permission', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING
	},
});

const Role = sequelize.define<RoleInstance>('role', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
});

const ProductInCart = sequelize.define<ProductInCartInstance>('product_in_cart', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	count: {
		type: DataTypes.INTEGER,
		defaultValue: 1,
		allowNull: false
	}
});


const Product = sequelize.define<ProductInstance>('product', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING
	},
	image: {
		type: DataTypes.STRING
	},
	weight: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	width: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	height: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	length: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	old_price: {
		type: DataTypes.FLOAT
	},
});

const Type = sequelize.define<TypeInstance>('type', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING
	},
	image: {
		type: DataTypes.STRING
	},
});

const Brand = sequelize.define<BrandInstance>('brand', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING
	},
	image: {
		type: DataTypes.STRING
	},
});


const City = sequelize.define<CityInstance>('city', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING
	},
});

const Market = sequelize.define<MarketInstance>('market', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	address: {
		type: DataTypes.STRING
	},
});

const ProductToMarket = sequelize.define<ProductToMarketInstance>('products_to_market', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	count: {
		type: DataTypes.INTEGER
	},
});


const BardType = sequelize.define<BrandTypeInstance>('brand_type', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
});

const PermissionToRole = sequelize.define<PermissionToRoleInstance>('permission_to_role', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
});


User.hasMany(Token);
Token.belongsTo(User);

User.belongsToMany(ProductToMarket, {through: ProductInCart});
ProductToMarket.belongsToMany(User, {through: ProductInCart});

Market.hasMany(ProductToMarket);
ProductToMarket.belongsTo(Market);

City.hasMany(Market);
Market.belongsTo(City);

Product.hasMany(ProductToMarket);
ProductToMarket.belongsTo(Product);

Type.hasOne(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Brand.belongsToMany(Type, {through: BardType});
Type.belongsToMany(Brand, {through: BardType});


Role.belongsToMany(Permission, {through: PermissionToRole});
Permission.belongsToMany(Role, {through: PermissionToRole});

Role.hasMany(User);
User.belongsTo(Role);


export {
	Token,
	User,
	Permission,
	Role,
	ProductInCart,
	Product,
	Type,
	Brand,
	BardType,
	City,
	Market,
	ProductToMarket
};
