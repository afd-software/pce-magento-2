<?php

namespace Afd\Pce\Block;
use Magento\Csp\Helper\CspNonceProvider;



class Afd extends \Magento\Framework\View\Element\Template
{
    /**

     * @var CspNonceProvider

     */
    private $cspNonceProvider;
    protected $helperData;

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Afd\Pce\Helper\Data $helperData,
        CspNonceProvider $cspNonceProvider
    ){
        $this->helperData = $helperData;
        $this->cspNonceProvider = $cspNonceProvider;
        return parent::__construct($context);
    }

    public function getConfig($code){
        return $this->helperData->getConfigValue($code);
    }

    public function getMageVersion(){
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $productMetadata = $objectManager->get('Magento\Framework\App\ProductMetadataInterface');
        return $productMetadata->getVersion();
    }

    public function getNonce(): string{
        return $this->cspNonceProvider->generateNonce();
    }

    /**
     * Get serialized config value and unserialize it
     *
     * @param string $path
     * @return array
     */
    public function getSerializedConfig($path) {
        $value = $this->helperData->getConfigValue($path);
        $result = [];

        if ($value) {
            // Try to unserialize the data
            $unserializedData = @unserialize($value);

            // If unserialization failed, try to decode as JSON
            if ($unserializedData === false && is_string($value)) {
                $unserializedData = json_decode($value, true);
            }

            if (is_array($unserializedData)) {
                $result = $unserializedData;
            }
        }

        return $result;
    }

}