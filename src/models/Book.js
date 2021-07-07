const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        amount: {
            type: Number,
            min: 0,
            required: true,
        },
        currency: {
            type: String,
            default: 'WUPIUPI',
            required: true,
        },
    },
}, {
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    timestamps: true,
});

// Add soft deletes
bookSchema.plugin(softDelete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('Book', bookSchema);
