'use strict';

const argon2 = require('argon2');
const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    authorPseudonym: String,
}, {
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    },
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await argon2.hash(this.password);
        return next();
    } catch (error) {
        return next(error);
    }
});

// Add soft deletes
userSchema.plugin(softDelete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('User', userSchema);
