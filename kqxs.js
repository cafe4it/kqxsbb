if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);
    Session.setDefault('data', [])
    Template.hello.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
            Session.set('data', [])
            var data = []
            var a = moment('2005-01-07'),
                b = moment('2008-01-01');
            var dayInRange = [];
            while (a.isBefore(b)) {
                dayInRange.push(a.format('D-M-YYYY'))
                a.add(7, 'd')
            }
           /* _.each(dayInRange,function(day){
                _.delay(function(){
                    Meteor.call('importio_kqxsmb_by_day', day, function (err, rs) {
                        if(err)console.log(err);
                        console.log(rs)
                        data = data.concat(rs);
                    })
                },4000,day)
            })*/

            Meteor.call('xray_minhngoc_theongay',dayInRange, function (err, rs) {
                if(err)console.log(err);
                Meteor.call('import_kqxsmb',rs,function(err,data){
                    console.log(err,data);
                })
            })
        }
    });
}

AdminConfig = {
    name: 'KQXS',
    adminEmails: ['cafe4it@gmail.com'],
    collections: {
        Lotos: {}
    }
};
Meteor.startup(function () {
    // code to run on server at startup

});

if (Meteor.isServer) {

}
