<?php


class Guest
{
    private $connection;

    private $table = "book";

    private $id;
    private $title;
    private $writer;
    private $pub_year;
    private $isbn_issn;
    private $genre;
    private $location;

    public function __construct($connection){
        $this->connection = $connection;
    }

    // public function store(){
    //     $stmt = $this->connection->prepare('INSERT INTO guest (id, `name`, is_member, id_number, address, time_visited) VALUES (:fid, :namer, :fismember, :fid_num, :faddress, :ftime_visited)');

    //     $bool = $stmt->execute([
    //         'fid' => $this->id,
    //         'namer' => $this->name,
    //         'fismember' => $this->is_member,
    //         'fid_num' => $this->id_number,
    //         'faddress' => $this->address,
    //         'ftime_visited' => time()
    //     ]);

    //     if($bool){
    //         return true;
    //     }else{
    //         error_log("Error message: " . $stmt->errorCode(), 3, "/var/log/nginx/error.log");
    //         return false;
    //     }
    // }


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
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->name = $title;
    }

    /**
     * @return mixed
     */
    public function getWriter()
    {
        return $this->writer;
    }

    /**
     * @param mixed $writer
     */
    public function setWriter($writer)
    {
        $this->writer = $writer;
    }

    /**
     * @return mixed
     */
    public function getYear()
    {
        return $this->pub_year;
    }

    /**
     * @param mixed $pub_year
     */
    public function setYear($pub_year)
    {
        $this->pub_year = $pub_year;
    }

    /**
     * @return mixed
     */
    public function getIsbnIssn()
    {
        return $this->isbn_issn;
    }

    /**
     * @param mixed $isbn_issn
     */
    public function setIsbnIssn($isbn_issn)
    {
        $this->isbn_issn = $isbn_issn;
    }

    /**
     * @return mixed
     */
    public function getGenre()
    {
        return $this->genre;
    }

    /**
     * @param mixed $genre
     */
    public function setGenre($genre)
    {
        $this->genre = $genre;
    }

    /**
     * @return mixed
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * @param mixed $location
     */
    public function setLocation($location)
    {
        $this->location = $location;
    }
}