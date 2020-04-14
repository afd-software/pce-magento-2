<?php

namespace Afd\Pce\Controller\Index;

use Magento\Framework\App\Action\Action;
use Magento\Framework\HTTP\Client\Curl;

class Index extends \Magento\Framework\App\Action\Action
{

    protected $logger;


    /**
     * @var \Magento\Framework\HTTP\Client\Curl
     */
    protected $_curl;

    /**
     * @var \Magento\Framework\Controller\Result\JsonFactory
     */
    protected $resultJsonFactory;


    protected $scopeConfig;

    /**
     * @param \Magento\Framework\App\Action\Context $context
     * @param \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory,
        \Magento\Framework\HTTP\Client\Curl $curl,
        \Afd\Pce\Logger\Logger $logger,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
    )
    {
        $this->resultJsonFactory = $resultJsonFactory;
        $this->_curl = $curl;
        $this->logger = $logger;
        $this->scopeConfig = $scopeConfig;
        parent::__construct($context);
    }

    public function getConfig($code)
    {
        return $this->helperData->getConfigValue('afd_' . $code);
    }

    public function execute()
    {
        $resultJson = $this->resultJsonFactory->create();
        $email = $this->getRequest()->getParam('username');

        if($email == "") {
            $email = $this->getRequest()->getParam('email');
        }

        $response = $this->sendCurlRequest($email);

        $parsed = json_decode($response, true);

        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;

        if (isset($parsed['status']) && $parsed['status'] == '-7') {
            $resultJson->setData('Data Licence Error');
        } else if ($parsed['Result'] == '-2') {
            $resultJson->setData($this->scopeConfig->getValue("afd_email/fields/msg", $storeScope));
        } else  {
            $resultJson->setData(true);
        }


        return $resultJson;
    }

    public function sendCurlRequest($email)
    {

        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;

        $url = "";

        $configPrefix = "afd_general";

        if ($this->scopeConfig->getValue("afd_email/account/useDefaultCredentials", $storeScope) == 0) {
            $configPrefix = "afd_email";
        }

        if ($this->scopeConfig->getValue($configPrefix . "/account/method", $storeScope) == "id") {
            $url = $this->scopeConfig->getValue($configPrefix . "/account/idPceUrl", $storeScope);
            $url .= "?id=" . $this->scopeConfig->getValue($configPrefix . "/account/id", $storeScope);
            $url .= "&token=" . $this->scopeConfig->getValue($configPrefix . "/account/token", $storeScope);
        } else {
            $url = $this->scopeConfig->getValue($configPrefix . "/account/serialPceUrl", $storeScope);
            $url .= "?serial=" . $this->scopeConfig->getValue($configPrefix . "/account/serial", $storeScope);
            $url .= "&password=" . $this->scopeConfig->getValue($configPrefix . "/account/password", $storeScope);
        }

        $url .= "&email=" . $email;
        $url .= "&task=live";
        $url .= "&fields=standard";
        $url .= "&format=json";
        $url .= "&data=email";

        if($this->scopeConfig->getValue("afd_advanced/debug/debugLogging", $storeScope) == 1) {
            $this->logger->debug($url);
        }


        $headers = [
            'Content-Type: application/json'
        ];
        //For Get Request
        $this->_curl->get($url);

        $responseBody = $this->_curl->getBody();

        if($this->scopeConfig->getValue("afd_advanced/debug/debugLogging", $storeScope) == 1) {
            $this->logger->debug($responseBody);
        }
        return $responseBody;
    }


}