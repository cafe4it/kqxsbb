Meteor.methods({
    importio_kqxsmb_by_day: function (dayInRange) {
        var lotos = Lotos.find({one : {$exists : false}},{fields : {day:1}}).fetch();
            lotos = _.map(lotos.slice(0,300),function(l){return l.day});
        var dayInRange = dayInRange || lotos;
        if (dayInRange) {
            var importioClient = new importio("527f1e6d-aaea-4635-bb0a-bbf424fca203", ImportIo_APIKEY, "import.io");
            var afterConnected = function (connected, done) {
                if (!connected) {
                    console.error("Unable to connect");
                    return;
                }
                var data = [];
                var runningQueries = 0;
                var index = 0;
                var callback = function (finished, message,day) {
                    if (message.type == "DISCONNECT") {
                        console.error("The query was cancelled as the client was disconnected");
                    }

                    if (message.type == "MESSAGE") {
                        if (message.data.hasOwnProperty("errorType")) {

                            throw new Meteor.Error(message.data)
                        } else {
                            if(_.size(message.data.results)>0){
                                var pageUrl = message.data.pageUrl, day = pageUrl.substr(pageUrl.lastIndexOf('/')+1).replace(".html",""),tmp = message.data.results[0];
                                var result = _.extend(tmp,{day : day});

                                if(_.isString(result.one)){
                                    data = data.concat(result);
                                }else{
                                    console.log(result);
                                }
                            }

                        }
                    }
                    if (finished) {
                        console.log("Done single query");

                        runningQueries--;
                        console.log(runningQueries);
                        if (runningQueries <= 0) {
                            runningQueries = 0;
                            var rs = _.map(data,function(obj){
                                var result = _.extend(obj, {
                                        two: obj.two.split(' '),
                                        three: obj.three.split(' '),
                                        four: obj.four.split(' '),
                                        five: obj.five.split(' '),
                                        six: obj.six.split(' '),
                                        seven: obj.seven.split(' ')
                                    }),
                                    eight = _.map(_.flatten(_.values(_.omit(result,'day'))), function (i) {
                                        return i.substr(i.length - 2)
                                    }),
                                    nine = _.groupBy(eight, function (i) {
                                        return i.substr(0, 1);
                                    })
                                return _.extend(result, {eight: eight, nine: nine});
                            })

                            done(null, rs);
                            console.log("All queries completed");
                        }
                    }
                }

                _.each(dayInRange,function(day){
                    runningQueries += 1;
                    importioClient.query({
                        "connectorGuids": [
                            "a8a1438a-3937-4726-add6-0374a2e726bd"
                        ],
                        "input": {
                            "webpage/url": xsmb_url({day:day})
                        }
                    }, callback);
                })
            }
            var rs = Async.runSync(function (done) {
                importioClient.connect(function (connected) {
                    afterConnected(connected, done)
                })
            });
            return rs.result;
        }
    },
    xray_kqxsmb_by_day: function (day) {
        if (day) {
            var urlQuery = xsmb_url({day: day});

            console.log(urlQuery);
            var rs = Async.runSync(function (done) {

                Xray(urlQuery)
                    .select({
                        $root: '#main div.center-box div:nth-child(14) table.result',
                        zero: 'td.result-prize em',
                        one: 'tr:nth-child(3) td.result-prize',
                        two: 'tr:nth-child(4) td.result-prize',
                        three: 'tr:nth-child(5) td.result-prize[html]',
                        four: 'tr:nth-child(6) td.result-prize',
                        five: 'tr:nth-child(7) td.result-prize[html]',
                        six: 'tr:nth-child(8) td.result-prize',
                        seven: 'tr:nth-child(9) td.result-prize'
                    })
                    .format(function (obj) {
                        var result = _.extend(obj, {
                                day: day,
                                one : obj.one.replace(/[^0-9]/g,""),
                                two: obj.two.replace(" ", ",").split(','),
                                three: obj.three.replace('<br>', ' ').split(' '),
                                four: obj.four.split(' '),
                                five: obj.five.replace('<br>', ' ').split(' '),
                                six: obj.six.split(' '),
                                seven: obj.seven.split(' ')
                            }),
                            eight = _.map(_.flatten(_.values(_.omit(result, 'day'))), function (i) {
                                return i.substr(i.length - 2)
                            }),
                            nine = _.groupBy(eight, function (i) {
                                return i.substr(0, 1);
                            })
                        return _.extend(result, {eight: eight, nine: nine});
                    })
                    .run(function (err, data) {
                        if (err)throw new Meteor.Error(err);
                        done(null, data);
                    })
            })
            return rs.result;
        }
    },
    minhngoc_mienbac_theo1ngay : function(dayInRange){
        var lotos = Lotos.find({one : {$exists : false}},{fields : {day:1}}).fetch();
        lotos = _.map(lotos.slice(0,100),function(l){return l.day});
        var dayInRange = dayInRange || lotos;
        if(dayInRange){
            var io = new importio("527f1e6d-aaea-4635-bb0a-bbf424fca203", "8h8eOJzqfGqNVDBzlNkpG6Z575wV8Ac9PiQvcwlz6eAgRWPxbnxX39HlFRWwiByYnErUb4zUB2XF8aeP4+GL/Q==", "import.io");
            var afterConnected = function (connected, done) {
                if (!connected) {
                    console.error("Unable to connect");
                    return;
                }
                var data = [];
                var runningQueries = 0;
                var index = 0;
                var callback = function (finished, message,day) {
                    if (message.type == "DISCONNECT") {
                        console.error("The query was cancelled as the client was disconnected");
                    }

                    if (message.type == "MESSAGE") {
                        if (message.data.hasOwnProperty("errorType")) {

                            throw new Meteor.Error(message.data)
                        } else {
                            if(_.size(message.data.results)>0){
                                data = data.concat(message.data.results[0]);
                            }

                        }
                    }
                    if (finished) {
                        console.log("Done single query");

                        runningQueries--;
                        console.log(runningQueries);
                        if (runningQueries <= 0) {
                            runningQueries = 0;
                            var rs = _.map(data,function(obj){
                                var result = _.extend(obj, {
                                        two: obj.two.split(' '),
                                        three: obj.three.split(' '),
                                        four: obj.four.split(' '),
                                        five: obj.five.split(' '),
                                        six: obj.six.split(' '),
                                        seven: obj.seven.split(' ')
                                    }),
                                    eight = _.map(_.flatten(_.values(_.omit(result,'day'))), function (i) {
                                        return i.substr(i.length - 2)
                                    }),
                                    nine = _.groupBy(eight, function (i) {
                                        return i.substr(0, 1);
                                    })
                                return _.extend(result, {eight: eight, nine: nine});
                            })

                            done(null, rs);
                            console.log("All queries completed");
                        }
                    }
                }

                _.each(dayInRange,function(day){
                    runningQueries += 1;
                    io.query({
                        "connectorGuids": [
                            "95ec3369-9b71-4cc9-a9f4-bd1accfb850e"
                        ],
                        "input": {
                            "webpage/url": minhngoc_mienbac_theo1ngay({day:day})
                        }
                    }, callback);
                })
            }

            var rs = Async.runSync(function (done) {
                io.connect(function (connected) {
                    afterConnected(connected, done)
                })
            });
            return rs.result;
        }
    },
    xray_minhngoc_theongay : function(dayInRange){
        if(dayInRange){
            var data = [];
            var size = _.size(dayInRange);
            _.each(dayInRange,function(day){
                var rs = Async.runSync(function(done){
                    var query = minhngoc_mienbac_theo1ngay({day:day});
                    Xray(query)
                        .select([{
                            $root : '#noidung table.bkqtinhmienbac',
                            day : '.tngay a',
                            zero : '.giaidb div',
                            one : '.giai1 div',
                            two : ['.giai2 div'],
                            three : ['.giai3 div'],
                            four :['.giai4 div'],
                            five : ['.giai5 div'],
                            six : ['.giai6 div'],
                            seven : ['.giai7 div']
                        }])
                        .format(format_minhngoc)
                        .run(function(err,data){
                            if(err) throw new Meteor.Error(err)
                            console.log(day,size--);
                            done(null, data);
                        })
                });
                data = data.concat(rs.result);
            });
            return _.sortBy(data,'result_date');
        }
    },
    import_kqxsmb : function (items) {
        if(items){
            var size = _.size(items);
            _.each(items,function(result){
                var day = moment(result.result_date).format('D-M-YYYY');
                var rs = Lotos.insert({
                    day : day,
                    result_date : result.result_date,
                    zero : result.zero,
                    one : result.one,
                    two : result.two,
                    three : result.three,
                    four : result.four,
                    five : result.five,
                    six : result.six,
                    seven : result.seven,
                    eight : result.eight,
                    nine : result.nine,
                    updated : true,
                    type : 'XSMB'
                });
                if(rs) {
                    size--;
                    console.log(size)
                }
            })
        }
    }
})

var format_minhngoc = function(obj){
    var result = _.extend(obj, {
            result_date : new Date(obj.day)
        }),
        eight = _.map(_.flatten(_.values(_.omit(result, 'day','result_date'))), function (i) {
            return i.substr(i.length - 2)
        }),
        nine = _.groupBy(eight, function (i) {
            return i.substr(0, 1);
        })
    return _.extend(result, {eight: eight, nine: JSON.stringify(nine)});
}