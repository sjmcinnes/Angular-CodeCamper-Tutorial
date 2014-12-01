(function () {
    'use strict';

    var serviceId = 'model';
    angular
        .module('app')
        .factory(serviceId, model);
    
    function model() {
        var service = {
            configureMetaDataStore: configureMetaDataStore
        };

        return service;

        function configureMetaDataStore(metadataStore) {
            //register session - tags
            registerSession(metadataStore);

            //register person - fullname
            registerPerson(metadataStore);

            //register timeslot - name
            registerTimeSlot(metadataStore);
        }

        function registerPerson(metadataStore) {
            metadataStore.registerEntityTypeCtor('Person', Person);

            function Person() { }

            Object.defineProperty(Person.prototype, 'fullName', {
                get: function () {
                    return this.lastName ? this.firstName + ' ' + this.lastName : this.firstName;
                }
            });
        }

        function registerSession(metadataStore) {
            metadataStore.registerEntityTypeCtor('Session', Session);

            function Session() { }

            Object.defineProperty(Session.prototype, 'tagsFormatted', {
                get: function () {
                    return this.tags ? this.tags.replace(/\|/g, ', ') : this.tags;
                },
                set: function(value) {
                    this.tags = value.replace(/\, /g, '|');
                }
            });
        }

        function registerTimeSlot(metadataStore) {
            metadataStore.registerEntityTypeCtor('TimeSlot', TimeSlot);

            function TimeSlot() { }

            Object.defineProperty(TimeSlot.prototype, 'name', {
                get: function () {
                    var start = this.start;
                    var value = moment.utc(start).format('ddd hh:mm a');
                    return value;
                }
            });
        }
    }
})();