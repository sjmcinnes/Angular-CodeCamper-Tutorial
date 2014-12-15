(function() {
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
        vm.filteredAttendees = [];
        vm.search = search;
        vm.attendeeSearch = '';
        vm.attendees = [];
        vm.attendeeCount = 0;
        vm.attendeeFilteredCount = 0;
        vm.paging = {
            currentPage: 1,
            maxPagesToShow: 5,
            pageSize: 15
        };
        vm.pageChanged = pageChanged;
        vm.refresh = refresh;

        activate();

        function activate() {
            common.activateController([getAttendees()], controllerId)
                .then(function() { log('Activated Attendees View'); });
        }

        function getAttendees(forceRefresh) {
            return datacontext.getAttendees(forceRefresh,
                vm.paging.currentPage, vm.paging.pageSize, vm.attendeeSearch).then(
                function(data) {
                    vm.attendees = data;
                    getAttendeeFilteredCount();
                    if (!vm.attendeeCount || forceRefresh) {
                        getAttendeeCount();
                    }
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
            getAttendees();
        }

        //function applyFilter() {
        //    vm.filteredAttendees = vm.attendees.filter(attendeeFilter);
        //}

        //function attendeeFilter(attendee) {
        //    var isMatch = vm.attendeeSearch ?
        //        common.textContains(attendee.fullName, vm.attendeeSearch)
        //        : true;
        //    return isMatch;
        //}

        function getAttendeeCount() {
            return datacontext.getAttendeeCount().then(function(data) {
                return vm.attendeeCount = data;
            });
        }

        function getAttendeeFilteredCount() {
            vm.attendeeFilteredCount = datacontext.getAttendeeFilteredCount(vm.attendeeSearch);
           }
        
        function pageChanged(page) {
            if (!page) {
                return;
            }
            vm.paging.currentPage = page;
            getAttendees();
        }

        Object.defineProperty(vm.paging, 'pageCount', {
            get: function() {
                return Math.floor(vm.attendeeFilteredCount/ vm.paging.pageSize) + 1;
            }
        });
    }
})();
