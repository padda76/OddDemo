
var ViewModel = function () {
    var self = this;
    self.activperson = ko.observable();
    self.people = ko.observableArray();
    self.error = ko.observable();
    self.message = ko.observable();
    self.showTable = ko.observable();
    self.showDetail = ko.observable();
    self.peopledetail = ko.observable();
    self.positionsdetail = ko.observableArray();
    self.positions = ko.observableArray();
    self.newPosition = {
        Person: ko.observable(),
        Title: ko.observable(),
        Department: ko.observable(),
        Description: ko.observable(),
        startDate: ko.observable(),
        endDate: ko.observable(),
        StillEmployed: ko.observable()
    };
    self.newPerson = {
        FName: ko.observable(),
        LName: ko.observable(),
        Email: ko.observable(),
        Phone: ko.observable()
    };

    var peopleUri = '/api/people/';
    var positionsUri = '/api/positions/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllPeople() {
        ajaxHelper(peopleUri, 'GET').done(function (data) {
            self.people(data);
        });
    }

    self.getPersonDetail = function (item) {
        ajaxHelper(peopleUri + item.Id, 'GET').done(function (data) {
            self.peopledetail(data);
            self.activperson = item.FName;
        });
    };

    self.deletePerson = function (item) {
        ajaxHelper(peopleUri + item.Id, 'DELETE').done(function (data) {
            self.people.remove(data);
        });
    };

    self.getPositionsDetail = function (item) {
        ajaxHelper(positionsUri + item.Id, 'GET').done(function (data) {
            self.positionsdetail(data);
            if (data){
                self.showTable(true);
            }
            else {
                self.message="No registered positions for person."
            }
        });
    };

    self.hideTable = function () {
        self.showTable(false);
    };

    self.hideDetail = function () {
        //self.showDetail(false);
        self.peopledetail(undefined);
    };

    function getPositions() {
        ajaxHelper(positionsUri, 'GET').done(function (data) {
            self.positions(data);
        });
    }

    self.addPosition = function (formElement) {
        var position = {
            PersonId: self.newPosition.Person().Id,
            Title: self.newPosition.Title(),
            Department: self.newPosition.Department(),
            Description: self.newPosition.Description(),
            startDate: self.newPosition.startDate(),
            endDate: self.newPosition.endDate(),
            StillEmployed: self.newPosition.StillEmployed()
        };

        ajaxHelper(positionsUri, 'POST', position).done(function (item) {
            self.positions.push(item);
            self.message = 'Position saved';
        });
    };

    self.addPerson = function (formElement) {
        var person = {
            FName: self.newPerson.FName(),
            LName: self.newPerson.LName(),
            Email: self.newPerson.Email(),
            Phone: self.newPerson.Phone()
        };

        ajaxHelper(peopleUri, 'POST', person).done(function (item) {
            self.people.push(item);
            self.message = 'Person saved';
        });
    };

    self.deletePerson = function (item) {
        ajaxHelper(peopleUri + item.Id, 'DELETE').done(function (data) {
            self.people.pop(data);
        });
    };

    // Set initial data.
    self.showTable === false;
    self.showDetail === false;
    getAllPeople();
    //getPositions();
};

ko.applyBindings(new ViewModel());




/*
var ViewModel = function () {
    var self = this;
    self.people = ko.observableArray();
    self.error = ko.observable();
    self.message = ko.observable();
    self.showTable = ko.observable();
    self.showDetail = ko.observable();
    self.peopledetail = ko.observable();
    self.positionsdetail = ko.observableArray();
    self.positions = ko.observableArray();
    self.newPosition = {
        Person: ko.observable(),
        Title: ko.observable(),
        Department: ko.observable(),
        Description: ko.observable(),
        startDate: ko.observable(),
        endDate: ko.observable(),
        StillEmployed: ko.observable()
    };
    self.newPerson = {
        FName: ko.observable(),
        LName: ko.observable(),
        Email: ko.observable(),
        Phone: ko.observable()
    };
    var peopleUri = '/api/people/';
    var positionsUri = '/api/positions/';
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }
    function getAllPeople() {
        ajaxHelper(peopleUri, 'GET').done(function (data) {
            self.people(data);
        });
    }
    self.getPersonDetail = function (item) {
        ajaxHelper(peopleUri + item.Id, 'GET').done(function (data) {
            self.peopledetail(data);
        });
    };
    self.getPositionsDetail = function (item) {
        ajaxHelper(positionsUri + item.Id, 'GET').done(function (data) {
            self.positionsdetail(data);
            self.showTable(true);
        });
    };
    self.hideTable = function () {
        self.showTable(false);
    };
    self.hideTable = function () {
        self.showDetail(false);
    };
    function getPositions() {
        ajaxHelper(positionsUri, 'GET').done(function (data) {
            self.positions(data);
        });
    }
    self.addPosition = function (formElement) {
        var position = {
            PersonId: self.newPosition.Person().Id,
            Title: self.newPosition.Title(),
            Department: self.newPosition.Department(),
            Description: self.newPosition.Description(),
            startDate: self.newPosition.startDate(),
            endDate: self.newPosition.endDate(),
            StillEmployed: self.newPosition.StillEmployed()
        };
        ajaxHelper(positionsUri, 'POST', position).done(function (item) {
            self.positions.push(item);
            self.message = 'Position saved';
        });
    };
    self.addPerson = function (formElement) {
        var person = {
            FName: self.newPerson.FName(),
            LName: self.newPerson.LName(),
            Email: self.newPerson.Email(),
            Phone: self.newPerson.Phone()
        };
        ajaxHelper(peopleUri, 'POST', person).done(function (item) {
            self.people.push(item);
            self.message = 'Person saved';
        });
    };
    // Set initial data.
    self.showTable == false;
    self.showDetail == false;
    getAllPeople();
    //getPositions();
};
ko.applyBindings(new ViewModel());

var ViewModel = function () {
    var self = this;
    self.people = ko.observableArray();
    self.error = ko.observable();
    self.message = ko.observable();
    self.showTable = ko.observable();
    self.showDetail = ko.observable();
    self.peopledetail = ko.observable();
    self.positionsdetail = ko.observableArray();
    self.positions = ko.observableArray();
    self.newPosition = {
        Person: ko.observable(),
        Title: ko.observable(),
        Department: ko.observable(),
        Description: ko.observable(),
        startDate: ko.observable(),
        endDate: ko.observable(),
        StillEmployed: ko.observable()
    };
    self.newPerson = {
        FName: ko.observable(),
        LName: ko.observable(),
        Email: ko.observable(),
        Phone: ko.observable()
    };

    var peopleUri = '/api/people/';
    var positionsUri = '/api/positions/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllPeople() {
        ajaxHelper(peopleUri, 'GET').done(function (data) {
            self.people(data);
        });
    }
  
    self.getPersonDetail = function (item) {
        ajaxHelper(peopleUri + item.Id, 'GET').done(function (data) {
            self.peopledetail(data);
        });
    }

    self.deletePerson = function (item) {
        ajaxHelper(peopleUri + item.Id, 'DELETE').done(function (data) {
            self.people.remove(data);
        });
    }

    self.getPositionsDetail = function (item) {
        ajaxHelper(positionsUri + item.Id, 'GET').done(function (data) {
            self.positionsdetail(data);
            self.showTable(true);
        });
    }

    self.hideTable = function () {
        self.showTable(false);
    }

    self.hideDetail = function () {
        self.peopleDetail==null;
        //self.showDetail(false);
    }

    function getPositions() {
        ajaxHelper(positionsUri, 'GET').done(function (data) {
            self.positions(data);
        });
    }

    self.addPosition = function (formElement) {
        var position = {
            PersonId: self.newPosition.Person().Id,
            Title: self.newPosition.Title(),
            Department: self.newPosition.Department(),
            Description: self.newPosition.Description(),
            startDate: self.newPosition.startDate(),
            endDate: self.newPosition.endDate(),
            StillEmployed: self.newPosition.StillEmployed()
        };

        ajaxHelper(positionsUri, 'POST', position).done(function (item) {
            self.positions.push(item);
            self.message = 'Position saved';
        });
    }

    self.addPerson = function (formElement) {
        var person = {
            FName: self.newPerson.FName(),
            LName: self.newPerson.LName(),
            Email: self.newPerson.Email(),
            Phone: self.newPerson.Phone()
        };

        ajaxHelper(peopleUri, 'POST', person).done(function (item) {
            self.people.push(item);
            self.message = 'Person saved';
        });
    }

    // Set initial data.
    self.showTable == false;
    self.showDetail == false;
    getAllPeople();
    //getPositions();
};

ko.applyBindings(new ViewModel());
*/