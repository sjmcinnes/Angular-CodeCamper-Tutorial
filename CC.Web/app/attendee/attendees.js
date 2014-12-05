(function () {
    'use strict';
    var controllerId = 'attendees';

    angular
        .module('app')
        .controller('attendees', attendees);

    attendees.$inject = ['common', 'config', 'datacontext'];

    function attendees(common, config, datacontext) {
        var vm = this;
        var keyCodes = config.keyCodes;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        vm.title = 'attendees';
        vm.filteredSpeakers = [];
        vm.search = search;
        vm.attendeeSearch = '';
        vm.attendees = [];
        vm.refresh = refresh;

        activate();

        function activate() {
            common.activateController([getAttendees()], controllerId)
                .then(function () { log('Activated Attendees View'); });
        }

        function getAttendees(forceRefresh) {
            return datacontext.getAttendees(forceRefresh).then(
                function (data) {
                    vm.attendees = data;
                    applyFilter();
                    return vm.attendees;
            });
        }

        function refresh() {
            getAttendees(true);
        }

        function search($event) {
            if ($event.keyCode === keyCodes.esc) {
                vm.attendeeSearch = '';
            }
            applyFilter();
        }

        function applyFilter() {
            vm.filteredAttendees = vm.attendees.filter(attendeeFilter);
        }

        function attendeeFilter(attendee) {
            var isMatch = vm.attendeeSearch ? 
                common.textContains(attendee.fullName, vm.attendeeSearch)
                : true;
            return isMatch;
        }
    }
})();
