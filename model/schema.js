Schemas = {}

Lotos = new Meteor.Collection('lotos');

Schemas.Loto = new SimpleSchema({
    result_date : {
        type : Date,
        optional : true
    },
    day : {
        type : String,
        optional : true
    },
    zero : {
        type : String,
        optional : true
    },
    one : {
        type : String,
        optional : true
    },
    two : {
        type : [String],
        optional : true
    },
    three : {
        type : [String],
        optional : true
    },
    four : {
        type : [String],
        optional : true
    },
    five : {
        type : [String],
        optional : true
    },
    six : {
        type : [String],
        optional : true
    },
    seven : {
        type : [String],
        optional : true
    },
    eight : {
        type : [String],
        optional : true
    },
    nine : {
        type : String,
        optional : true
    },
    updated : {
        type : Boolean,
        optional : true
    },
    type : {
        type : String,
        optional : true
    }
});

Lotos.attachSchema(Schemas.Loto);