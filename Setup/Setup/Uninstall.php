<?php
/**
 * AFD PCE Module Uninstall Script
 *
 * This script runs when the module is uninstalled via:
 * bin/magento module:uninstall Afd_Pce
 *
 * It removes all database tables and data created by this module.
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Setup;

use Magento\Framework\Setup\UninstallInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\Setup\ModuleContextInterface;

/**
 * Class Uninstall
 * 
 * Handles cleanup when the module is uninstalled
 */
class Uninstall implements UninstallInterface
{
    /**
     * Module uninstall code
     *
     * @param SchemaSetupInterface $setup
     * @param ModuleContextInterface $context
     * @return void
     */
    public function uninstall(SchemaSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();

        // Drop all metadata tables created by this module
        $connection = $setup->getConnection();
        
        // Drop tables in reverse order to avoid foreign key constraint issues
        $tablesToDrop = [
            'afd_pce_customer_address_metadata',
            'afd_pce_order_address_metadata',
            'afd_pce_quote_address_metadata',
            // Legacy table names (if they exist)
            'afd_customer_address_meta',
            'afd_order_address_meta',
            'afd_quote_address_meta',
        ];

        foreach ($tablesToDrop as $table) {
            if ($connection->isTableExists($setup->getTable($table))) {
                $connection->dropTable($setup->getTable($table));
            }
        }

        $setup->endSetup();
    }
}
