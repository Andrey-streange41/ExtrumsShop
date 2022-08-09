const sequelize = require('../db/db');
const {DataTypes, INTEGER, STRING, BOOLEAN, BLOB} = require('sequelize');


const User = sequelize.define('user',{
    id:{type:INTEGER,primaryKey:true, autoIncrement:true},
    email:{type:STRING,unique:true,allowNull:false},
    password:{type:STRING,allowNull:false},
    role:{type:STRING,defaultValue:'USER'}
});

const UserInfo = sequelize.define('user_info',{
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    firstname:{type:STRING,allowNull:false},
    lastname:{type:STRING,allowNull:false},
    telphone:{type:STRING,allowNull:true},
    avatar:{type:STRING,allowNull:true},
    agrements:{type:BOOLEAN,defaultValue:false},
    user_id:{type:INTEGER,allowNull:false,unique:true}
});

const Comments = sequelize.define('comments',{
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    message:{type:STRING},
    user_id:{type:INTEGER,allowNull:false},
    product_id:{type:INTEGER,allowNull:false},
    date_id:{type:INTEGER,allowNull:false},
});

const Date = sequelize.define('date',{
    id:{type:INTEGER,primaryKey:true, autoIncrement:true},
    month:{type:STRING,allowNull:false},
    year:{type:INTEGER,allowNull:false},
    day:{type:INTEGER,allowNull:false},
    hour:{type:INTEGER,allowNull:false},
    min:{type:INTEGER,allowNull:false},
});

const Product = sequelize.define('product',{
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    images:{type:STRING,allowNull:false},
    full_info:{type:STRING,allowNull:false},
    is_favor:{type:BOOLEAN,defaultValue:false},
    category:{type:STRING,allowNull:false},
    sub_category:{type:STRING,allowNull:false},
    avatar:{type:STRING,allowNull:false},
    title:{type:STRING,allowNull:false},
    price:{type:INTEGER,allowNull:false},
    discount:{type:BOOLEAN,defaultValue:false}
});

const UserCommunication = sequelize.define('user_communication',{
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:STRING,allowNull:false,unique:true},
    amount:{type:INTEGER,allowNull:false},
    img1:{type:STRING,allowNull:false},
    active_img:{type:STRING,allowNull:false}
});

const UserCommunicationProducts = sequelize.define('usercommunication_products',{
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    product_id:{type:INTEGER,allowNull:false},
    communication_id:{type:INTEGER,allowNull:false}
})

const Characteristics = sequelize.define('characteristics',{
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:STRING,allowNull:false},
    info:{type:STRING,allowNull:false},
    product_id:{type:INTEGER,allowNull:false}
});

const Purpose = sequelize.define('purpose',{
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    product_id:{type:INTEGER,allowNull:false},
    name:{type:STRING,allowNull:false},
    is_active:{type:BOOLEAN,defaultValue:false},
    sub_menu_id:{type:INTEGER,allowNull:false}
});

const SubMenu = sequelize.define('sub_menu',{
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    text:{type:STRING,allowNull:false},
    is_active:{type:BOOLEAN,defaultValue:false},
    img:{type:STRING,allowNull:false},
    active_img:{type:STRING,allowNull:false}
});

const AddCharacteristics = sequelize.define('add_characteristics',{
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    title:{type:STRING,allowNull:false},
    sub_menu_id:{type:INTEGER,allowNull:false}
});

const ModalItems=sequelize.define('modal_items',{
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    title:{type:STRING,allowNull:false},
    sub_menu_id:{type:INTEGER,allowNull:false}
}
);


const SubCategory=sequelize.define('sub_categories',{
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    modal_items_id:{type:INTEGER,allowNull:false},
    title:{type:STRING,allowNull:false},
    is_active:{type:BOOLEAN,defaultValue:false},
}
);


User.hasOne(UserInfo);
UserInfo.belongsTo(User);

User.hasMany(Comments);
Comments.belongsTo(User);

Date.hasMany(Comments);
Comments.belongsTo(Date);

Product.hasMany(Comments),{as:'comments'};
Comments.belongsTo(Product);

Product.hasMany(Characteristics,{as:'characteristics'});
Characteristics.belongsTo(Product);

Product.hasMany(Purpose,{as:'purpose'});
Purpose.belongsTo(Product);


Product.belongsToMany(UserCommunication,{through:UserCommunicationProducts});
UserCommunication.belongsToMany(Product,{through:UserCommunicationProducts});

SubMenu.hasMany(Purpose);
Purpose.belongsTo(SubMenu);

SubMenu.hasMany(AddCharacteristics);
AddCharacteristics.belongsTo(SubMenu);

SubMenu.hasOne(ModalItems);
ModalItems.belongsTo(SubMenu);

ModalItems.hasMany(SubCategory);
SubCategory.belongsTo(ModalItems);


module.exports ={
    UserCommunication,
    UserCommunicationProducts,
    User,
    UserInfo,
    Comments,
    Date,
    Product,
    Characteristics,
    Purpose,
    SubMenu,
    AddCharacteristics,
    ModalItems,
    SubCategory
}