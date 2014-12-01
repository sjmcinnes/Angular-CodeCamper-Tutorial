(function () {
    'use strict';
    var controllerId = 'attendees';

    angular
        .module('app')
        .controller('attendees', attendees);

    attendees.$inject = ['common', 'datacontext'];

    function attendees(common, datacontext) {
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        vm.title = 'attendees';
        vm.attendees = [];
        activate();

        function activate() {
            common.activateController([getAttendees()], controllerId)
                .then(function () { log('Activated Attendees View'); });
        }

        function getAttendees() {
            return datacontext.getAttendees().then(
                function (data) {
                return vm.attendees = data;
            });
        }
    }
})();
