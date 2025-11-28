<?php
declare(strict_types=1);

namespace Afd\Pce\Setup;

use Magento\Framework\Setup\InstallSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\DB\Ddl\Table;
use Magento\Framework\DB\Adapter\AdapterInterface; // For INDEX_TYPE_FOREIGN

class InstallSchema implements InstallSchemaInterface
{
    /**
     * Installs DB schema for a module
     *
     * @param SchemaSetupInterface $setup
     * @param ModuleContextInterface $context
     * @return void
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
     */
    public function install(SchemaSetupInterface $setup, ModuleContextInterface $context)
    {
        $installer = $setup;
        $installer->startSetup();

        // Table: afd_quote_address_meta
        $this->createAddressMetaTable(
            $installer,
            'afd_quote_address_meta',
            'quote_address', // Parent table for quote addresses
            'entity_id',     // Parent table's primary key
            'AFD Quote Address Metadata'
        );

        // Table: afd_order_address_meta
        $this->createAddressMetaTable(
            $installer,
            'afd_order_address_meta',
            'sales_order_address', // Parent table for order addresses
            'entity_id',           // Parent table's primary key
            'AFD Order Address Metadata'
        );

        // Table: afd_customer_address_meta
        $this->createAddressMetaTable(
            $installer,
            'afd_customer_address_meta',
            'customer_address_entity', // Parent table for customer addresses
            'entity_id',               // Parent table's primary key
            'AFD Customer Address Metadata'
        );

        $installer->endSetup();
    }

    /**
     * Helper function to create an address metadata table
     *
     * @param SchemaSetupInterface $installer
     * @param string $tableName
     * @param string $parentTable
     * @param string $parentKey
     * @param string $comment
     * @return void
     */
    private function createAddressMetaTable(
        SchemaSetupInterface $installer,
        string $tableName,
        string $parentTable,
        string $parentKey,
        string $comment
    ): void {
        if (!$installer->tableExists($tableName)) {
            $table = $installer->getConnection()->newTable(
                $installer->getTable($tableName)
            )->addColumn(
                'metadata_id',
                Table::TYPE_INTEGER,
                null,
                ['identity' => true, 'unsigned' => true, 'nullable' => false, 'primary' => true],
                'Metadata ID'
            )->addColumn(
                'parent_id',
                Table::TYPE_INTEGER,
                null,
                ['unsigned' => true, 'nullable' => false],
                'Parent Address ID (Links to ' . $parentTable . '.' . $parentKey . ')'
            )->addColumn(
                'metadata',
                Table::TYPE_TEXT,
                '64k',
                ['nullable' => true],
                'Address Metadata JSON'
            )->addColumn(
                'is_validated',
                Table::TYPE_BOOLEAN,
                null,
                ['nullable' => false, 'default' => false],
                'Is Address Validated by AFD'
            )->addColumn(
                'created_at',
                Table::TYPE_TIMESTAMP,
                null,
                ['nullable' => false, 'default' => Table::TIMESTAMP_INIT],
                'Created At'
            )->addColumn(
                'updated_at',
                Table::TYPE_TIMESTAMP,
                null,
                ['nullable' => false, 'default' => Table::TIMESTAMP_INIT_UPDATE],
                'Updated At'
            )->addIndex(
                $installer->getIdxName($tableName, ['parent_id']),
                ['parent_id']
            )->addForeignKey(
                $installer->getFkName($tableName, 'parent_id', $parentTable, $parentKey),
                'parent_id',
                $installer->getTable($parentTable),
                $parentKey,
                Table::ACTION_CASCADE
            )->setComment(
                $comment
            );
            $installer->getConnection()->createTable($table);
        }
    }
}
