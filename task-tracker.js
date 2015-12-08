(function () {

    'use strict';
    
    var tasks = [{
        name: "Test Task #1",
        date: new Date("12/01/2012"),
        assigned: "John Doe"
    }, {
        name: "Test Task #2",
        date: new Date("12/02/2012"),
        assigned: "John Doe"
    }, {
        name: "Test Task #3",
        date: new Date("12/03/2012"),
        assigned: "John Doe"
    }, {
        name: "Test Task #4",
        date: new Date("12/04/2012"),
        assigned: "John Doe"
    }, {
        name: "Test Task #5",
        date: new Date("12/05/2012"),
        assigned: "John Doe"
    }, {
        name: "Test Task #6",
        date: new Date("12/06/2012"),
        assigned: "John Doe"
    }, {
        name: "Test Task #7",
        date: new Date("12/07/2012"),
        assigned: "John Doe"
    }];

    var loadTasks = function () {
        $("#tasks-table").empty();
        $.each(tasks, function (index, task) {
            $("#tasks-table")
                .append($("<tr></tr>")
                    .append($("<td></td>")
                        .append($("<b></b>")
                            .append(task.name)))
                        .append($("<td></td>")
                                .append(task.date.toLocaleDateString()))
                        .append($("<td></td>")
                                .append($("<b></b>")
                                        .append(task.assigned))));
        });
    };

    var submitClick = function () {
        var task = {
            name: $("#taskName").val(),
            date: new Date($("#date").val()),
            assigned: $("#assignedTo").val()
        };

        var errorString = "";
        if(!task.name || task.name.length === 0) {
            errorString += "Name is required.\n";
        }
        if(!task.date || task.date.length === 0)  {
            errorString += "Date is required.\n";
        }
        if(task.date && task.date.toString() === "Invalid Date") {
            errorString += "Date is invalid.\n";
        }
        if(!task.assigned || task.assigned.length === 0)  {
            errorString += "Assigned To is required.\n";
        }
        
        if(errorString.length > 0) {
            alert(errorString);
            return;
        }
        
        tasks.unshift(task);
        loadTasks();
        $("#taskName").val("");
        $("#date").val("");
        $("#assignedTo").val("");
    };

    $(document).ready(function () {
        loadTasks();
        $("#submit").click(submitClick);
    });

})();