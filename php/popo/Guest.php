<?php


class Guest
{
    private $connection;

    private $table = "guest";

    private $id;
    private $name;
    private $is_member;
    private $id_number;
    private $address;
    private $time_visited;

    public function __construct($connection){
        $this->connection = $connection;
    }

    public function store(){
        $stmt = $this->connection->prepare('INSERT INTO guest (id, `name`, is_member, id_number, address, time_visited) VALUES (:fid, :namer, :fismember, :fid_num, :faddress, :ftime_visited)');

        $bool = $stmt->execute([
            'fid' => $this->id,
            'namer' => $this->name,
            'fismember' => $this->is_member,
            'fid_num' => $this->id_number,
            'faddress' => $this->address,
            'ftime_visited' => time()
        ]);

        if($bool){
            return true;
        }else{
            error_log("Error message: " . $stmt->errorCode(), 3, "/var/log/nginx/error.log");
            return false;
        }
    }


    /**
     * @return mixed
     */
    public function getConnection()
    {
        return $this->connection;
    }

    /**
     * @param mixed $connection
     */
    public function setConnection($connection)
    {
        $this->connection = $connection;
    }

    /**
     * @return string
     */
    public function getTable()
    {
        return $this->table;
    }

    /**
     * @param string $table
     */
    public function setTable($table)
    {
        $this->table = $table;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getIsMember()
    {
        return $this->is_member;
    }

    /**
     * @param mixed $is_member
     */
    public function setIsMember($is_member)
    {
        $this->is_member = $is_member;
    }

    /**
     * @return mixed
     */
    public function getIdNumber()
    {
        return $this->id_number;
    }

    /**
     * @param mixed $id_number
     */
    public function setIdNumber($id_number)
    {
        $this->id_number = $id_number;
    }

    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed $address
     */
    public function setAddress($address)
    {
        $this->address = $address;
    }

    /**
     * @return mixed
     */
    public function getTimeVisited()
    {
        return $this->time_visited;
    }

    /**
     * @param mixed $time_visited
     */
    public function setTimeVisited($time_visited)
    {
        $this->time_visited = $time_visited;
    }
}