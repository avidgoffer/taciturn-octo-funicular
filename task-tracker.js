(function() {

    'use strict';

    var taskNameEditBox = $("#taskName");
    var taskDateEditBox = $("#date");
    var taskAssignedToEditBox = $("#assignedTo");
    var tasks = [];

    var loadTasks = function() {
        $("#tasks-table").empty();
        $.each(tasks, function(index, task) {
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

    var submitClick = function() {
        var task = {
            name: taskNameEditBox.val(),
            date: new Date(taskDateEditBox.val()),
            assigned: taskAssignedToEditBox.val()
        };

        var errorString = "";
        if(!task.name || task.name.length === 0) {
            errorString += "Name is required.\n";
        }
        if(!task.date || task.date.length === 0) {
            errorString += "Date is required.\n";
        }
        if(task.date && task.date.toString() === "Invalid Date") {
            errorString += "Date is invalid.\n";
        }
        if(!task.assigned || task.assigned.length === 0) {
            errorString += "Assigned To is required.\n";
        }

        if(errorString.length > 0) {
            alert(errorString);
            return;
        }

        tasks.unshift(task);
        loadTasks();
        taskNameEditBox.val("");
        taskDateEditBox.val("");
        taskAssignedToEditBox.val("");
    };

    $(document).ready(function() {
        $.ajax({
            dataType: "json",
            url: "tasks.json",
            success: function(data) {
                $.each(data, function(index, task){
                    task.date = new Date(task.date);
                });
                tasks = data;
                loadTasks();
            }
        });

        $("#submit").click(submitClick);
    });

})();