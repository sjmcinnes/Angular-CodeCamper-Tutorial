(function () {
    'use strict';
    var controllerId = 'speakers';

    angular
        .module('app')
        .controller('speakers', speakers);

    speakers.$inject = ['common','datacontext']; 

    function speakers(common, datacontext) {
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        vm.title = 'speakers';
        vm.speakers = [];
        vm.refresh = refresh;
        activate();

        function activate() {
            common.activateController([getSpeakers()], controllerId)
                .then(function () { log('Activated Speakers View'); });
        }

        function getSpeakers(forceRefresh) {
            return datacontext.getSpeakerPartials(forceRefresh).then(function(data) {
                return vm.speakers = data;
            });
        }

        function refresh() { getSpeakers(true); }

    }
})();
