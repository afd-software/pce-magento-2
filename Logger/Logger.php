<?php
namespace Afd\Pce\Logger;

class Logger extends \Monolog\Logger
{

    public function debug($message, array $context = array())
    {
        return $this->addRecord(static::DEBUG, $message, $context);
    }

}