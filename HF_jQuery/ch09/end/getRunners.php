<?php
    $query = "SELECT first_name, last_name, gender, finish_time FROM runners order by finish_time ASC ";
    $result = db_connection($query);

    $my_array = array();

    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        array_push($my_array, $row);
    }

    echo json_encode($my_array);

    function db_connection( $query ) {
        mysql_connect('127.0.0.1', 'runner_db_user', 'runner_db_password')
            OR die( 'Could not connect to database.');
        mysql_select_db('hfjq_race_info');

        return mysql_query($query);
    }
?>