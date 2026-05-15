<?php
/**
 * AFD PCE Cleanse on Submit Helper
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\Helper\Context;
use Magento\Store\Model\ScopeInterface;
use Psr\Log\LoggerInterface;

/**
 * Class CleanseOnSubmit
 * 
 * Helper class for Cleanse on Submit configuration settings
 */
class CleanseOnSubmit extends AbstractHelper
{
    const XML_PATH_ENABLED = 'afd_typeahead/cleanse_on_submit/enabled';
    const XML_PATH_CHECKOUT_SHIPPING = 'afd_typeahead/cleanse_on_submit/checkout_shipping';
    const XML_PATH_CHECKOUT_BILLING = 'afd_typeahead/cleanse_on_submit/checkout_billing';
    const XML_PATH_CUSTOMER_ACCOUNT = 'afd_typeahead/cleanse_on_submit/customer_account';
    const XML_PATH_MODAL_TITLE = 'afd_typeahead/cleanse_on_submit/modal_title';
    const XML_PATH_MODAL_MESSAGE = 'afd_typeahead/cleanse_on_submit/modal_message';
    const XML_PATH_YOUR_ADDRESS_LABEL = 'afd_typeahead/cleanse_on_submit/your_address_label';
    const XML_PATH_SUGGESTED_ADDRESS_LABEL = 'afd_typeahead/cleanse_on_submit/suggested_address_label';
    const XML_PATH_ACCEPT_BUTTON_TEXT = 'afd_typeahead/cleanse_on_submit/accept_button_text';
    const XML_PATH_REJECT_BUTTON_TEXT = 'afd_typeahead/cleanse_on_submit/reject_button_text';
    const XML_PATH_NO_SUGGESTION_MESSAGE = 'afd_typeahead/cleanse_on_submit/no_suggestion_message';
    const XML_PATH_USE_DEFAULT_CREDENTIALS = 'afd_typeahead/cleanse_on_submit/use_default_credentials';
    const XML_PATH_AUTH_METHOD = 'afd_typeahead/cleanse_on_submit/auth_method';
    const XML_PATH_SERIAL_PCE_URL = 'afd_typeahead/cleanse_on_submit/serial_pce_url';
    const XML_PATH_ID_PCE_URL = 'afd_typeahead/cleanse_on_submit/id_pce_url';
    const XML_PATH_SERIAL = 'afd_typeahead/cleanse_on_submit/serial';
    const XML_PATH_PASSWORD = 'afd_typeahead/cleanse_on_submit/password';
    const XML_PATH_ID = 'afd_typeahead/cleanse_on_submit/id';
    const XML_PATH_TOKEN = 'afd_typeahead/cleanse_on_submit/token';
    
    // Default credentials paths
    const XML_PATH_DEFAULT_AUTH_METHOD = 'afd_general/account/method';
    const XML_PATH_DEFAULT_SERIAL_PCE_URL = 'afd_general/account/serialPceUrl';
    const XML_PATH_DEFAULT_ID_PCE_URL = 'afd_general/account/idPceUrl';
    const XML_PATH_DEFAULT_SERIAL = 'afd_general/account/serial';
    const XML_PATH_DEFAULT_PASSWORD = 'afd_general/account/password';
    const XML_PATH_DEFAULT_ID = 'afd_general/account/id';
    const XML_PATH_DEFAULT_TOKEN = 'afd_general/account/token';

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * Constructor
     *
     * @param Context $context
     * @param LoggerInterface $logger
     */
    public function __construct(
        Context $context,
        LoggerInterface $logger
    ) {
        parent::__construct($context);
        $this->logger = $logger;
    }

    /**
     * Check if Cleanse on Submit is enabled
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isEnabled($storeId = null): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_ENABLED,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Check if enabled for checkout shipping step
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isEnabledForCheckoutShipping($storeId = null): bool
    {
        return $this->isEnabled($storeId) && (bool)$this->scopeConfig->getValue(
            self::XML_PATH_CHECKOUT_SHIPPING,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Check if enabled for checkout billing/place order
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isEnabledForCheckoutBilling($storeId = null): bool
    {
        return $this->isEnabled($storeId) && (bool)$this->scopeConfig->getValue(
            self::XML_PATH_CHECKOUT_BILLING,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Check if enabled for customer account address forms
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isEnabledForCustomerAccount($storeId = null): bool
    {
        return $this->isEnabled($storeId) && (bool)$this->scopeConfig->getValue(
            self::XML_PATH_CUSTOMER_ACCOUNT,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get modal title
     *
     * @param int|null $storeId
     * @return string
     */
    public function getModalTitle($storeId = null): string
    {
        $title = $this->scopeConfig->getValue(
            self::XML_PATH_MODAL_TITLE,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
        return $title ?: 'Verify Your Address';
    }

    /**
     * Get modal message
     *
     * @param int|null $storeId
     * @return string
     */
    public function getModalMessage($storeId = null): string
    {
        $message = $this->scopeConfig->getValue(
            self::XML_PATH_MODAL_MESSAGE,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
        return $message ?: 'We found a suggested match for your address. Please review and select which address you would like to use.';
    }

    /**
     * Get "Your Address" label
     *
     * @param int|null $storeId
     * @return string
     */
    public function getYourAddressLabel($storeId = null): string
    {
        $label = $this->scopeConfig->getValue(
            self::XML_PATH_YOUR_ADDRESS_LABEL,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
        return $label ?: 'Your Address';
    }

    /**
     * Get "Suggested Address" label
     *
     * @param int|null $storeId
     * @return string
     */
    public function getSuggestedAddressLabel($storeId = null): string
    {
        $label = $this->scopeConfig->getValue(
            self::XML_PATH_SUGGESTED_ADDRESS_LABEL,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
        return $label ?: 'Suggested Address';
    }

    /**
     * Get accept button text
     *
     * @param int|null $storeId
     * @return string
     */
    public function getAcceptButtonText($storeId = null): string
    {
        $text = $this->scopeConfig->getValue(
            self::XML_PATH_ACCEPT_BUTTON_TEXT,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
        return $text ?: 'Use Suggested Address';
    }

    /**
     * Get reject button text
     *
     * @param int|null $storeId
     * @return string
     */
    public function getRejectButtonText($storeId = null): string
    {
        $text = $this->scopeConfig->getValue(
            self::XML_PATH_REJECT_BUTTON_TEXT,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
        return $text ?: 'Keep My Address';
    }

    /**
     * Get no suggestion message
     *
     * @param int|null $storeId
     * @return string
     */
    public function getNoSuggestionMessage($storeId = null): string
    {
        $message = $this->scopeConfig->getValue(
            self::XML_PATH_NO_SUGGESTION_MESSAGE,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
        return $message ?: "We couldn't find a better match for your address. You may continue with your entered address.";
    }

    /**
     * Check if using default credentials
     *
     * @param int|null $storeId
     * @return bool
     */
    public function useDefaultCredentials($storeId = null): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_USE_DEFAULT_CREDENTIALS,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get authentication method
     *
     * @param int|null $storeId
     * @return string
     */
    public function getAuthMethod($storeId = null): string
    {
        if ($this->useDefaultCredentials($storeId)) {
            return (string)$this->scopeConfig->getValue(
                self::XML_PATH_DEFAULT_AUTH_METHOD,
                ScopeInterface::SCOPE_STORE,
                $storeId
            ) ?: 'id';
        }
        
        return (string)$this->scopeConfig->getValue(
            self::XML_PATH_AUTH_METHOD,
            ScopeInterface::SCOPE_STORE,
            $storeId
        ) ?: 'id';
    }

    /**
     * Get Refiner API URL
     *
     * @param int|null $storeId
     * @return string
     */
    public function getRefinerUrl($storeId = null): string
    {
        $authMethod = $this->getAuthMethod($storeId);
        
        if ($this->useDefaultCredentials($storeId)) {
            // Always use the Refiner URL from cleanse config, not the default PCE URL
            $path = $authMethod === 'serial' 
                ? self::XML_PATH_SERIAL_PCE_URL 
                : self::XML_PATH_ID_PCE_URL;
        } else {
            $path = $authMethod === 'serial' 
                ? self::XML_PATH_SERIAL_PCE_URL 
                : self::XML_PATH_ID_PCE_URL;
        }
        
        $url = $this->scopeConfig->getValue(
            $path,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
        
        return $url ?: 'https://refiner.afd.co.uk/v1/refiner/GBR/clean';
    }

    /**
     * Get Serial
     *
     * @param int|null $storeId
     * @return string
     */
    public function getSerial($storeId = null): string
    {
        if ($this->useDefaultCredentials($storeId)) {
            return (string)$this->scopeConfig->getValue(
                self::XML_PATH_DEFAULT_SERIAL,
                ScopeInterface::SCOPE_STORE,
                $storeId
            );
        }
        
        return (string)$this->scopeConfig->getValue(
            self::XML_PATH_SERIAL,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get Password
     *
     * @param int|null $storeId
     * @return string
     */
    public function getPassword($storeId = null): string
    {
        if ($this->useDefaultCredentials($storeId)) {
            return (string)$this->scopeConfig->getValue(
                self::XML_PATH_DEFAULT_PASSWORD,
                ScopeInterface::SCOPE_STORE,
                $storeId
            );
        }
        
        return (string)$this->scopeConfig->getValue(
            self::XML_PATH_PASSWORD,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get ID
     *
     * @param int|null $storeId
     * @return string
     */
    public function getId($storeId = null): string
    {
        if ($this->useDefaultCredentials($storeId)) {
            return (string)$this->scopeConfig->getValue(
                self::XML_PATH_DEFAULT_ID,
                ScopeInterface::SCOPE_STORE,
                $storeId
            );
        }
        
        return (string)$this->scopeConfig->getValue(
            self::XML_PATH_ID,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get Token
     *
     * @param int|null $storeId
     * @return string
     */
    public function getToken($storeId = null): string
    {
        if ($this->useDefaultCredentials($storeId)) {
            return (string)$this->scopeConfig->getValue(
                self::XML_PATH_DEFAULT_TOKEN,
                ScopeInterface::SCOPE_STORE,
                $storeId
            );
        }
        
        return (string)$this->scopeConfig->getValue(
            self::XML_PATH_TOKEN,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get all configuration as array for frontend
     *
     * @param int|null $storeId
     * @return array
     */
    public function getConfigArray($storeId = null): array
    {
        $authMethod = $this->getAuthMethod($storeId);
        
        $config = [
            'enabled' => $this->isEnabled($storeId),
            'checkoutShipping' => $this->isEnabledForCheckoutShipping($storeId),
            'checkoutBilling' => $this->isEnabledForCheckoutBilling($storeId),
            'customerAccount' => $this->isEnabledForCustomerAccount($storeId),
            'modalTitle' => $this->getModalTitle($storeId),
            'modalMessage' => $this->getModalMessage($storeId),
            'yourAddressLabel' => $this->getYourAddressLabel($storeId),
            'suggestedAddressLabel' => $this->getSuggestedAddressLabel($storeId),
            'acceptButtonText' => $this->getAcceptButtonText($storeId),
            'rejectButtonText' => $this->getRejectButtonText($storeId),
            'noSuggestionMessage' => $this->getNoSuggestionMessage($storeId),
            'refinerUrl' => $this->getRefinerUrl($storeId),
            'authMethod' => $authMethod,
        ];
        
        // Add credentials based on auth method
        if ($authMethod === 'serial') {
            $config['serial'] = $this->getSerial($storeId);
            $config['password'] = $this->getPassword($storeId);
        } else {
            $config['id'] = $this->getId($storeId);
            $config['token'] = $this->getToken($storeId);
        }
        
        return $config;
    }
}
