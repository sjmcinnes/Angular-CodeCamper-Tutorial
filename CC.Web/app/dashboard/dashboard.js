(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.map = {
            title: 'Location'

        };
        vm.speakers = {
            interval: 5000,
            list: [],
            title: 'Top Speakers'
        };
        vm.news = {
            title: 'Code Camp',
            description: 'blah, blah, blah! Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.content = {
            predicate: '',
            reverse: false,
            setSort: setContentSort,
            title: 'Content',
            tracks: []
        };
        vm.attendeeCount = 0;
        vm.sessionCount = 0;
        vm.speakerCount = 0;

        vm.title = 'Dashboard';

        activate();

        function activate() {
            getTopSpeakers();
            var promises = [getAttendeeCount(), getSessionCount(), getSpeakerCount(), getTrackCounts()];
            common.activateController(promises, controllerId)
                .then(function() { log('Activated Dashboard View'); });
        }

        function getAttendeeCount() {
            return datacontext.getAttendeeCount().then(function(data) {
                return vm.attendeeCount = data;
            });
        }

        function getSessionCount() {
            return datacontext.getSessionCount().then(function(data) {
                return vm.sessionCount = data;
            });
        }

        function getTrackCounts() {
            return datacontext.getTrackCounts().then(function(data) {
                return vm.content.tracks = data;
            });
        }

        function getTopSpeakers() {
            vm.speakers.list = datacontext.getSpeakersLocal();
        }

        function getSpeakerCount() {
            return datacontext.getSpeakerCount().then(function(data) {
                return vm.speakerCount = data;
            });
        }

        function setContentSort(prop) {
            vm.content.predicate = prop;
            vm.content.reverse = !vm.content.reverse;
        }
    }
})();