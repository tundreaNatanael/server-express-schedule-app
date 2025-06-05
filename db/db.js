import { Sequelize, DataTypes } from "sequelize";

const db = {
  NAME: "schedule_app",
  USERNAME: "root",
  PASSWORD: "",

  options: {
    dialect: "mysql",
    timezone: "+00:00",
    host: "localhost",
    port: 3306,
    logging: function (str) {
      console.log(str);
    },
  },
};

export const sequelize = new Sequelize(
  db.NAME,
  db.USERNAME,
  db.PASSWORD,
  db.options
);

export const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: false,
  }
);

export const Bookings = sequelize.define(
  "Bookings",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
    duration_minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: false,
  }
);

export const UserTypes = sequelize.define(
  "User_Types",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nr_minutes_per_week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: false,
  }
);

export const PlatformData = sequelize.define(
  "platform_data",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: false,
  }
);

Users.belongsTo(UserTypes, { foreignKey: "user_type", targetKey: "id" });
UserTypes.hasMany(Users, { foreignKey: "user_type", sourceKey: "id" });
Bookings.belongsTo(Users, { foreignKey: "user_id", targetKey: "id" });
Users.hasMany(Bookings, { foreignKey: "user_id", sourceKey: "id" });
