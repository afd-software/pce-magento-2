<?php
/**
 * AFD PCE Categorised Metadata Fields Source Model
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model\Config\Source;

use Magento\Framework\Data\OptionSourceInterface;

/**
 * Class CategorisedMetadataFields
 * 
 * This class provides a structured source model for all available AFD PCE address metadata fields.
 * It serves as the data provider for the admin configuration interface, organizing hundreds of
 * possible metadata fields into logical categories for easier management.
 *
 * Key responsibilities:
 *
 * 1. Defines all available metadata field categories (Address, Business, Geographical, etc.)
 * 2. Provides human-readable labels for each category and field
 * 3. Supplies detailed descriptions for each field that appear as tooltips in the admin UI
 * 4. Organizes fields by category for the categorised fieldset display
 * 5. Provides a flat list of all available fields when needed
 *
 * The class supports the JSON-based flexible metadata storage approach, allowing administrators
 * to select which specific address metadata fields should be captured from the AFD PCE API
 * and stored with customer addresses.
 */
class CategorisedMetadataFields implements OptionSourceInterface
{
    /** Field categories */
    const CATEGORY_ADDRESS                              = 'address';
    const CATEGORY_ADMINISTRATIVE                       = 'administrative';
    const CATEGORY_BUSINESS                             = 'business';
    const CATEGORY_DEMOGRAPHICS                         = 'demographics';
    const CATEGORY_D_X                                  = 'd_x';
    const CATEGORY_EDUCATION                            = 'education';
    const CATEGORY_GEOGRAPHICAL                         = 'geographical';
    const CATEGORY_HEALTH                               = 'health';
    const CATEGORY_PROPERTY_CHARACTERISTICS             = 'property_characteristics';
    const CATEGORY_E_P_C_RESIDENTIAL                    = 'e_p_c_residential';
    const CATEGORY_E_P_C_COMMERCIAL                     = 'e_p_c_commercial';
    const CATEGORY_PROPERTY_ATTRIBUTES                  = 'property_attributes';
    const CATEGORY_COMPANIES_HOUSE                      = 'companies_house';

    /**
     * Get field categories
     *
     * @return array
     */
    public function getCategories(): array
    {
        return [
            self::CATEGORY_ADDRESS                              => __('Address'),
            self::CATEGORY_ADMINISTRATIVE                       => __('Administrative'),
            self::CATEGORY_BUSINESS                             => __('Business'),
            self::CATEGORY_DEMOGRAPHICS                         => __('Demographics'),
            self::CATEGORY_D_X                                  => __('DX'),
            self::CATEGORY_EDUCATION                            => __('Education'),
            self::CATEGORY_GEOGRAPHICAL                         => __('Geographical'),
            self::CATEGORY_HEALTH                               => __('Health'),
            self::CATEGORY_PROPERTY_CHARACTERISTICS             => __('Property Characteristics'),
            self::CATEGORY_E_P_C_RESIDENTIAL                    => __('EPC Residential'),
            self::CATEGORY_E_P_C_COMMERCIAL                     => __('EPC Commercial'),
            self::CATEGORY_PROPERTY_ATTRIBUTES                  => __('Property Attributes'),
            self::CATEGORY_COMPANIES_HOUSE                      => __('Companies House'),
        ];
    }

    /**
     * Get field descriptions for tooltips
     *
     * @return array
     */
    public function getFieldDescriptions(): array
    {
        return [
            // Address
            'Organisation'                           => __('Business Name'),
            'Property'                               => __('Property (building-includes any sub-building)'),
            'Street'                                 => __('Delivery Street (includes any sub-street)'),
            'Locality'                               => __('Locality (sometimes a village name; in ZipAddress used for Urbanization)'),
            'Town'                                   => __('Postal Delivery Town (or City)'),
            'Postcode'                               => __('The Royal Mail Postcode for this address (or ZipCode)'),
            'PostcodeFrom'                           => __(''),
            'DPS'                                    => __('The Delivery Point Suffix which along with the postcode uniquely identifies the letterbox'),
            'UDPRN'                                  => __('Royal Mail Unique Delivery Point Reference Number assigned to this letter box'),
            'UPRN'                                   => __('Unique Property Reference Number (UPRN) used to link other datasets, used heavily in public sector data.'),
            'USRN'                                   => __(''),
            'PostalCounty'                           => __('Royal Mail supplied postal county.'),
            'AbbreviatedPostalCounty'                => __('Royal Mail approved abbreviation is used where available for the postal county.'),
            'OptionalCounty'                         => __('Postal counties including optional ones for most addresses which would otherwise not have a county name.'),
            'AbbreviatedOptionalCounty'              => __('Counties are Optional for addressing and AFD provide different types of county to meet your needs.'),
            'TraditionalCounty'                      => __('Counties are Optional for addressing and AFD provide different types of county to meet your needs.'),
            'AdministrativeCounty'                   => __('Counties are Optional for addressing and AFD provide different types of county to meet your needs.'),
            'CountryISO'                             => __('Alpha-3 Country ISO Code'),
            'CountryISO2'                            => __(''),
            'Country'                                => __('Country of Address.'),

            // Administrative
            'WardCode'                               => __('Code identifying the electoral ward for this postcode.'),
            'WardName'                               => __('Name identifying the electoral ward for this postcode.'),
            'ConstituencyCode'                       => __('Parliamentary Constituency Code for this postcode.'),
            'Constituency'                           => __('Parliamentary Constituency for this postcode.'),
            'AuthorityCode'                          => __('Local/Unitary Authority for this Postcode (same as the start of the ward code).'),
            'Authority'                              => __('Local/Unitary Authority for this postcode.'),
            'EERCode'                                => __('Code identifying the European Electoral Region for this postcode'),
            'EERName'                                => __('Name identifying the European Electoral Region for this postcode'),
            'NUTS3Code'                              => __(''),
            'NUTS3Name'                              => __(''),

            // Business
            'Phone'                                  => __('STD Code or Phone Number.'),
            'Business'                               => __('Provides a description of the type of business.'),
            'Size'                                   => __('Gives an indication of the number of employees of an organisation at this particular office.'),
            'SICCode'                                => __(''),
            'LocationType'                           => __('The type of Business Location, e.g. Head Office or Branch Office.'),
            'BranchCount'                            => __('The number of branches for this business.'),
            'GroupID'                                => __(''),
            'Turnover'                               => __('The modelled annual turnover for the business.'),
            'NationalSize'                           => __('Gives an indication of the number of employees of an organisation covering all sites.'),

            // Demographics
            'CensationCode'                          => __('Censation Code assigned to this Postcode.'),
            'CensationLabel'                         => __('Label for the Censation Code.'),
            'Affluence'                              => __('Provides a description of affluence.'),
            'Lifestage'                              => __('Provides a description of life stage.'),
            'AdditionalCensusInfo'                   => __('Additional information from the Census.'),

            // DX
            'DXNumber'                               => __(''),
            'DXExchange'                             => __(''),
            'DXProfession'                           => __(''),
            'DXOrganisation'                         => __(''),

            // Education
            'LEACode'                                => __('Code identifying the Local Education Authority for this postcode'),
            'LEAName'                                => __('Name identifying the Local Education Authority for this postcode'),
            'DevolvedConstituencyCode'               => __('Devolved Constituency Code for this postcode (currently covers Scotland).'),
            'DevolvedConstituencyName'               => __('Devolved Constituency Name for this postcode (currently covers Scotland).'),
            'POLAR3Young'                            => __(''),
            'POLAR3Adult'                            => __(''),
            'POLAR4'                                 => __(''),
            'DeprivationRank'                        => __('The Index of Multiple Deprivation (IMD) is a measure of relative deprivation for small areas (Lower Super Output Areas (LSOAs). Scottish IMD also available.'),
            'DeprivationDecile'                      => __('The Index of Multiple Deprivation (IMD) is a measure of relative deprivation for small areas (Lower Super Output Areas (LSOAs). Scottish IMD also available.'),
            'LEPCode'                                => __(''),
            'LEPName'                                => __(''),
            'LEPCode2'                               => __(''),
            'LEPName2'                               => __(''),
            'AEBArea'                                => __(''),
            'AEBSource'                              => __(''),
            'AEBEffectiveFrom'                       => __(''),
            'AEBEffectiveTo'                         => __(''),

            // Geographical
            'GridE'                                  => __('Grid Easting as a 6 digit reference'),
            'GridN'                                  => __('Grid Northing as a 6 digit reference'),
            'Latitude'                               => __('Latitude representation of Grid Reference in Decimal Format (WGS84) 9 digit reference (53.6655850).'),
            'Longitude'                              => __('Longitude representation of Grid Reference in Decimal Format (WGS84) 8 digit reference (-1.8369464)'),
            'SubCountryName'                         => __('Provides the devolved or non-UK country name (e.g. England, Scotland, Wales etc.).'),
            'SOALower'                               => __('Lower level Super Output Area (Data Zone in Scotland, Super Output Area in Northern Ireland)'),
            'SOAMiddle'                              => __('Middle level Super Output Area (Intermediate Geography in Scotland, not applicable for Northern Ireland)'),
            'UrbanRuralCode'                         => __('Provides a description which goes along with the Urban Rural Code.'),
            'UrbanRuralName'                         => __(''),
            'GridLevel'                              => __('This indicates the level of grid reference returned (1 – postcode, 2 – address, 3 – approximate). This is only available to address level grid users.'),
            'TundraLSOA'                             => __(''),
            'TundraMSOA'                             => __(''),

            // Health
            'NHSCode'                                => __('National Health Service Area Code'),
            'NHSName'                                => __('National Health Service Area Name'),
            'NHSRegionCode'                          => __(''),
            'NHSRegionName'                          => __(''),
            'PCTCode'                                => __('National Heath Service Clinical Commisioning Group Code for England (Local Health Board Code in Wales, Community Health Partnership in Scotland, Local Commissioning Group in Northern Ireland, Primary Healthcare Directorate in the Isle of Man)'),
            'PCTName'                                => __('National Heath Service Clinical Commisioning Group Name for England (Local Health Board Code in Wales, Community Health Partnership in Scotland, Local Commissioning Group in Northern Ireland, Primary Healthcare Directorate in the Isle of Man)'),

            // Property Characteristics
            'FlatFlag'                               => __(''),
            'JustBuilt'                              => __('Contains the date of inclusion on PAF for properties thought to be recently built.'),
            'PostcodeType'                           => __('L for Large User Postcode, S for Small User. Large user postcodes are allocated to single addresses (usually businesses) that receive at least 500 mail items per day.'),
            'AddressType'                            => __('Indication of the type of property level data to capture to have the full address for a property on the selected postcode.'),
            'AddressTypeDescription'                 => __('Description matching the Address Type.'),
            'Occupancy'                              => __('Indication of the type of occupants of properties found on the selected postcode.'),
            'OccupancyDescription'                   => __('Description matching the Occupancy.'),
            'MultipleResidencyIndicator'             => __('Indicates if an address is a multiple residency address, e.g., a flat within a building with a single delivery point. This is a single character – O for Multiple Residency Owner, M for Multiple Residency address. 1 where the flag is indicated, 0 where the flag is not valid. This is only available to Multiple Residency users.'),
            'Alias'                                  => __(''),
            'NotYetBuilt'                            => __('Identify and deliver services to the addresses of properties that are at the planning and construction stage.'),
            'Abase'                                  => __(''),
            'MailsortCode'                           => __('Used for obtaining bulk mail discounts.'),
            'TVRegion'                               => __(''),
            'STDCode'                                => __(''),

            // EPC Residential
            'CurrentEnergyRating'                    => __(''),
            'PotentialEnergyRating'                  => __(''),
            'CurrentEnergyEfficiency'                => __(''),
            'PotentialEnergyEfficiency'              => __(''),
            'PropertyType'                           => __(''),
            'BuiltForm'                              => __(''),
            'InspectionDate'                         => __(''),
            'LodgementDate'                          => __(''),
            'TransactionType'                        => __(''),
            'EnvironmentalImpactCurrent'             => __(''),
            'EnvironmentalImpactPotential'           => __(''),
            'EnergyConsumptionCurrent'               => __(''),
            'EnergyConsumptionPotential'             => __(''),
            'CO2EmissionsCurrent'                    => __(''),
            'CO2EmissionsCurrentPerFloorArea'        => __(''),
            'CO2EmissionsPotential'                  => __(''),
            'LightingCostCurrent'                    => __(''),
            'LightingCostPotential'                  => __(''),
            'HeatingCostCurrent'                     => __(''),
            'HeatingCostPotential'                   => __(''),
            'HotWaterCostCurrent'                    => __(''),
            'HotWaterCostPotential'                  => __(''),
            'TotalFloorArea'                         => __(''),
            'EnergyTariff'                           => __(''),
            'MainsGasFlag'                           => __(''),
            'FloorLevel'                             => __(''),
            'FlatTopStorey'                          => __(''),
            'FlatStoreyCount'                        => __(''),
            'MainHeatingControls'                    => __(''),
            'MultiGlazeProportion'                   => __(''),
            'GlazedType'                             => __(''),
            'GlazedArea'                             => __(''),
            'ExtensionCount'                         => __(''),
            'NumberHabitableRooms'                   => __(''),
            'NumberHeatedRooms'                      => __(''),
            'LowEnergyLighting'                      => __(''),
            'NumberOpenFireplaces'                   => __(''),
            'HotWaterDescription'                    => __(''),
            'HotWaterEnergyEfficiency'               => __(''),
            'HotWaterEnvironmentalEfficiency'        => __(''),
            'FloorDescription'                       => __(''),
            'FloorEnergyEfficiency'                  => __(''),
            'FloorEnvironmentalEfficiency'           => __(''),
            'WindowsDescription'                     => __(''),
            'WindowsEnergyEfficiency'                => __(''),
            'WindowsEnvironmentalEfficiency'         => __(''),
            'WallsDescription'                       => __(''),
            'WallsEnergyEfficiency'                  => __(''),
            'WallsEnvironmentalEfficiency'           => __(''),
            'SecondaryHeatDescription'               => __(''),
            'SheatingEnergyEfficiency'               => __(''),
            'SheatingEnvironmentalEfficiency'        => __(''),
            'RoofDescription'                        => __(''),
            'RoofEnergyEfficiency'                   => __(''),
            'RoofEnvironmentalEfficiency'            => __(''),
            'MainHeatDescription'                    => __(''),
            'MainHeatEnergyEfficiency'               => __(''),
            'MainHeatEnvironmentalEfficiency'        => __(''),
            'MainHeatControlsDescription'            => __(''),
            'MainHeatControlsEnergyEfficiency'       => __(''),
            'MainHeatControlsEnvironmentalEfficiency' => __(''),
            'LightingDescription'                    => __(''),
            'LightingEnergyEfficiency'               => __(''),
            'LightingEnvironmentalEfficiency'        => __(''),
            'MainFuel'                               => __('The main type of fuel used by the property’s heating system'),
            'WindTurbineCount'                       => __(''),
            'HeatLossCorridor'                       => __(''),
            'UnheatedCorridorLength'                 => __(''),
            'FloorHeight'                            => __(''),
            'PhotoSupply'                            => __(''),
            'SolarWaterHeatingFlag'                  => __(''),
            'MechanicalVentilation'                  => __(''),
            'ConstructionAgeBand'                    => __(''),
            'Tenure'                                 => __(''),
            'FixedLightingOutletsCount'              => __(''),
            'LowEnergyFixedLightCount'               => __(''),

            // EPC Commercial
            'LMK'                                    => __(''),
            'ExpiryDate'                             => __(''),
            'AssetRatingBand'                        => __(''),
            'AssetRating'                            => __(''),
            'NewBuildBenchmark'                      => __(''),
            'ExistingStockBenchmark'                 => __(''),
            'BuildingLevel'                          => __(''),
            'MainHeatingFuel'                        => __(''),
            'OtherFuelDescription'                   => __(''),
            'SpecialEnergyUses'                      => __(''),
            'RenewableSources'                       => __(''),
            'FloorArea'                              => __(''),
            'StandardEmissions'                      => __(''),
            'TargetEmissions'                        => __(''),
            'TypicalEmissions'                       => __(''),
            'BuildingEmissions'                      => __(''),
            'AirconPresent'                          => __(''),
            'AirconKWRating'                         => __(''),
            'EstimatedAirconKWRating'                => __(''),
            'AcInspectionCommissioned'               => __(''),
            'BuildingEnvironment'                    => __(''),
            'PrimaryEnergyValue'                     => __(''),

            // Property Attributes
            'LoneParent'                             => __('Lone Parent'),
            'NumKids'                                => __('Number of Children under 18 at property'),
            'PropertyLifeStage'                      => __(''),
            'HouseHoldComposition'                   => __(''),
            'HouseHoldSize'                          => __(''),
            'HouseHoldChild_0_4'                     => __(''),
            'HouseHoldChild_5_7'                     => __(''),
            'HouseHoldChild_8_10'                    => __(''),
            'HouseHoldChild_11_16'                   => __(''),
            'HouseHoldChild_17_21'                   => __(''),
            'HomeOwnership'                          => __('Home Ownership Status'),
            'HavePets'                               => __('Has Pets (any undefined pet, including cat and/or dog)'),
            'HaveDog'                                => __('Has Dog (specifically)'),
            'HaveCat'                                => __('Has Cat (specifically)'),
            'RenewalMonthHome'                       => __('Home Insurance Renewal Month (joint buildings and contents)'),
            'RenewalMonthContents'                   => __('Contents Insurance Renewal Month (just contents insurance renewal)'),
            'RenewalMonthBuilding'                   => __('Buildings Insurance Renewal Month (just buildings insurance renewal month, no contents)'),
            'RenewalMonthMotor'                      => __('Car Insurance Renewal Month'),
            'RenewalMonthCar'                        => __('Motor Insurance Renewal Month'),
            'RenewalMonthVan'                        => __('Van Insurance Renewal Month'),
            'RenewalMonthPets'                       => __('Pet Insurance Renewal Month'),
            'RenewalMonthTravel'                     => __('Travel Insurance Renewal Month'),
            'RenewalMonthBike'                       => __('Motorbike Insurance Renewal Month'),
            'ResType'                                => __('Type of Residence (e.g., Detached, Flat, Bungalow, etc.)'),
            'Bedrooms'                               => __('The number of bedrooms in a property'),
            'TotalRooms'                             => __('The number of rooms within a property excluding bathrooms and kitchen'),
            'YearOfBuild'                            => __('The year the property has been recorded as being built'),
            'CurrentPropValue'                       => __('The current estimated value of the property, based on Land Registry data'),
            'CurrentListingStatus'                   => __('The current listing status of the property, e.g. Available or Under Offer'),
            'LastTransactionDate'                    => __('The date of the last transaction recorded by the Land Registry (data goes back to 1995, exclusions apply)'),
            'HouseValueBand'                         => __('The estimated value of the property split into £100,000 bands for ease of selection'),
            'Listed'                                 => __('Whether the property is listed by English Heritage, Cadw or Historic Scotland, and its category of listing'),
            'Watercourse200M'                        => __(''),
            'DistanceToWatercourse'                  => __('The distance (in metres) to a watercourse if it is within 200 metres'),
            'DistanceToRoad'                         => __('The distance to the centre line of the nearest road, not necessarily accessible'),
            'DistanceToTree'                         => __('The distance from the nearest tree over 10 metres tall to the property geocode'),
            'BurglaryRate'                           => __('The number of burglaries per property per year averaged over a LSOA'),
            'WallType'                               => __('What walls the property contains, possible values cavity wall, solid brick, sandstone, granite, timber frame, system built and SAP05'),
            'HeatingType'                            => __('The main method by which the property is heated'),
            'RoofType'                               => __('The type of roof a property has (Flat, Pitched, Thatched) and its level of insulation'),
            'AvgRoofSlope'                           => __('The average slope of the property roof, can be used to identify properties with flat roofs'),
            'FlatRoofFraction'                       => __('The estimated fraction of a property which has a flat roof'),
            'NumberOfBathrooms'                      => __('Number of Bathrooms'),
            'HomeContentsCoverValue'                 => __('Value of Home Contents Insurance Cover'),
            'BuildingConstructionPeriod'             => __('Building Construction Period'),
            'Bungalow'                               => __('Bungalow'),
            'EstimatedPropertyValue'                 => __('Estimated Property Value'),
            'PVLowerConfidenceLimit95'               => __(''),
            'PVUpperConfidenceLimit95'               => __(''),
            'EstimatedYearBuilt'                     => __('Estimated year that the property was built'),
            'EstimatedYearBuiltLowerLimit'           => __('Estimated year that the property was built'),
            'EstimatedYearBuiltUpperLimit'           => __('Estimated year that the property was built'),

            // Companies House
            'CompanyHouse'                           => __(''),
            'CompanyName'                            => __(''),
            'CompanyNumber'                          => __(''),
            'CompanyCategory'                        => __(''),
            'CompanyStatus'                          => __(''),
            'CountryOfOrigin'                        => __(''),
            'DissolutionDate'                        => __(''),
            'IncorporationDate'                      => __(''),
            'AccountingRefDay'                       => __(''),
            'AccountingRefMonth'                     => __(''),
            'AccountsNextDueDate'                    => __(''),
            'AccountsLastMadeUpDate'                 => __(''),
            'AccountsCategory'                       => __(''),
            'ReturnsNextDueDate'                     => __(''),
            'ReturnsLastMadeUpDate'                  => __(''),
            'NumberMortageCharges'                   => __(''),
            'NumberMortageOutstanding'               => __(''),
            'NumberMortagePartSatisfied'             => __(''),
            'NumberMortageSatisfied'                 => __(''),
            'SicCode1'                               => __(''),
            'SicCode2'                               => __(''),
            'SicCode3'                               => __(''),
            'SicCode4'                               => __(''),
            'NumberGeneralPartners'                  => __(''),
            'NumberLimitedPartners'                  => __(''),
            'PreviousNames'                          => __(''),
            'ConfStmtNextDueDate'                    => __(''),
            'ConfStmtLastMadeUpDate'                 => __(''),

        ];
    }

    /**
     * Get fields by category
     *
     * @return array
     */
    public function getFieldsByCategory(): array
    {
        return [
            self::CATEGORY_ADDRESS => [
                'Organisation'                           => __('Organisation'),
                'Property'                               => __('Property'),
                'Street'                                 => __('Street'),
                'Locality'                               => __('Locality'),
                'Town'                                   => __('Town'),
                'Postcode'                               => __('Postcode'),
                'PostcodeFrom'                           => __('PostcodeFrom'),
                'DPS'                                    => __('DPS'),
                'UDPRN'                                  => __('UDPRN'),
                'UPRN'                                   => __('UPRN'),
                'USRN'                                   => __('USRN'),
                'PostalCounty'                           => __('Postal County'),
                'AbbreviatedPostalCounty'                => __('Abbreviated Postal County'),
                'OptionalCounty'                         => __('Optional County'),
                'AbbreviatedOptionalCounty'              => __('Abbreviated Optional County'),
                'TraditionalCounty'                      => __('Traditional County'),
                'AdministrativeCounty'                   => __('Administrative County'),
                'CountryISO'                             => __('Country ISO'),
                'CountryISO2'                            => __('Country ISO2'),
                'Country'                                => __('Country'),
            ],
            self::CATEGORY_ADMINISTRATIVE => [
                'WardCode'                               => __('Ward Code'),
                'WardName'                               => __('Ward Name'),
                'ConstituencyCode'                       => __('Constituency Code'),
                'Constituency'                           => __('Constituency'),
                'AuthorityCode'                          => __('Authority Code'),
                'Authority'                              => __('Authority'),
                'EERCode'                                => __('EER Code'),
                'EERName'                                => __('EER Name'),
                'NUTS3Code'                              => __('NUTS3 Code'),
                'NUTS3Name'                              => __('NUTS3 Name'),
            ],
            self::CATEGORY_BUSINESS => [
                'Phone'                                  => __('Phone'),
                'Business'                               => __('Business'),
                'Size'                                   => __('Size'),
                'SICCode'                                => __('SIC Code'),
                'LocationType'                           => __('Location Type'),
                'BranchCount'                            => __('Branch Count'),
                'GroupID'                                => __('Group ID'),
                'Turnover'                               => __('Turnover'),
                'NationalSize'                           => __('National Size'),
            ],
            self::CATEGORY_DEMOGRAPHICS => [
                'CensationCode'                          => __('Censation Code'),
                'CensationLabel'                         => __('Censation Label'),
                'Affluence'                              => __('Affluence'),
                'Lifestage'                              => __('Lifestage'),
                'AdditionalCensusInfo'                   => __('Additional Census Info'),
            ],
            self::CATEGORY_D_X => [
                'DXNumber'                               => __('DX Number'),
                'DXExchange'                             => __('DX Exchange'),
                'DXProfession'                           => __('DX Profession'),
                'DXOrganisation'                         => __('DX Organisation'),
            ],
            self::CATEGORY_EDUCATION => [
                'LEACode'                                => __('LEA Code'),
                'LEAName'                                => __('LEA Name'),
                'DevolvedConstituencyCode'               => __('Devolved Constituency Code'),
                'DevolvedConstituencyName'               => __('Devolved Constituency Name'),
                'POLAR3Young'                            => __('POLAR3 Young'),
                'POLAR3Adult'                            => __('POLAR3 Adult'),
                'POLAR4'                                 => __('POLAR4'),
                'DeprivationRank'                        => __('Deprivation Rank'),
                'DeprivationDecile'                      => __('Deprivation Decile'),
                'LEPCode'                                => __('LEP Code'),
                'LEPName'                                => __('LEP Name'),
                'LEPCode2'                               => __('LEP Code 2'),
                'LEPName2'                               => __('LEP Name 2'),
                'AEBArea'                                => __('AEB Area'),
                'AEBSource'                              => __('AEB Source'),
                'AEBEffectiveFrom'                       => __('AEB Effective From'),
                'AEBEffectiveTo'                         => __('AEB Effective To'),
            ],
            self::CATEGORY_GEOGRAPHICAL => [
                'GridE'                                  => __('GridE'),
                'GridN'                                  => __('GridN'),
                'Latitude'                               => __('Latitude'),
                'Longitude'                              => __('Longitude'),
                'SubCountryName'                         => __('Sub Country Name'),
                'SOALower'                               => __('SOA Lower'),
                'SOAMiddle'                              => __('SOA Middle'),
                'UrbanRuralCode'                         => __('Urban Rural Code'),
                'UrbanRuralName'                         => __('Urban Rural Name'),
                'GridLevel'                              => __('Grid Level'),
                'TundraLSOA'                             => __('Tundra LSOA'),
                'TundraMSOA'                             => __('Tundra MSOA'),
            ],
            self::CATEGORY_HEALTH => [
                'NHSCode'                                => __('NHS Code'),
                'NHSName'                                => __('NHS Name'),
                'NHSRegionCode'                          => __('NHS Region Code'),
                'NHSRegionName'                          => __('NHS Region Name'),
                'PCTCode'                                => __('PCT Code'),
                'PCTName'                                => __('PCT Name'),
            ],
            self::CATEGORY_PROPERTY_CHARACTERISTICS => [
                'FlatFlag'                               => __('FlatFlag'),
                'JustBuilt'                              => __('Just Built'),
                'PostcodeType'                           => __('Postcode Type'),
                'AddressType'                            => __('Address Type'),
                'AddressTypeDescription'                 => __('Address Type Description'),
                'Occupancy'                              => __('Occupancy'),
                'OccupancyDescription'                   => __('Occupancy Description'),
                'MultipleResidencyIndicator'             => __('Multiple Residency Indicator'),
                'Alias'                                  => __('Alias'),
                'NotYetBuilt'                            => __('Not Yet Built'),
                'Abase'                                  => __('Abase'),
                'MailsortCode'                           => __('Mailsort Code'),
                'TVRegion'                               => __('TV Region'),
                'STDCode'                                => __('STD Code'),
            ],
            self::CATEGORY_E_P_C_RESIDENTIAL => [
                'EPC_Residential_LMK'                                    => __('LMK'),
                'EPC_Residential_LodgementDate'                          => __('Lodgement Date'),
                'EPC_Residential_ExpiryDate'                             => __('Expiry Date'),
                'EPC_Residential_CurrentEnergyRating'                    => __('Current Energy Rating'),
                'EPC_Residential_PotentialEnergyRating'                  => __('Potential Energy Rating'),
                'EPC_Residential_PropertyType'                           => __('Property Type'),
                'EPC_Residential_BuiltForm'                              => __('Built Form'),
                'EPC_Residential_InspectionDate'                         => __('Inspection Date'),
                'EPC_Residential_TransactionType'                        => __('Transaction Type'),
                'EPC_Residential_EnvironmentalImpactCurrent'             => __('Environmental Impact Current'),
                'EPC_Residential_EnvironmentalImpactPotential'           => __('Environmental Impact Potential'),
                'EPC_Residential_EnergyConsumptionCurrent'               => __('Energy Consumption Current'),
                'EPC_Residential_EnergyConsumptionPotential'             => __('Energy Consumption Potential'),
                'EPC_Residential_CO2EmissionsCurrent'                    => __('CO2 Emissions Current'),
                'EPC_Residential_CO2EmissionsCurrentPerFloorArea'        => __('CO2 Emissions Current Per Floor Area'),
                'EPC_Residential_CO2EmissionsPotential'                  => __('CO2 Emissions Potential'),
                'EPC_Residential_LightingCostCurrent'                    => __('Lighting Cost Current'),
                'EPC_Residential_LightingCostPotential'                  => __('Lighting Cost Potential'),
                'EPC_Residential_HeatingCostCurrent'                     => __('Heating Cost Current'),
                'EPC_Residential_HeatingCostPotential'                   => __('Heating Cost Potential'),
                'EPC_Residential_HotWaterCostCurrent'                    => __('Hot Water Cost Current'),
                'EPC_Residential_HotWaterCostPotential'                  => __('Hot Water Cost Potential'),
                'EPC_Residential_TotalFloorArea'                         => __('Total Floor Area'),
                'EPC_Residential_EnergyTariff'                           => __('Energy Tariff'),
                'EPC_Residential_MainsGasFlag'                           => __('Mains Gas Flag'),
                'EPC_Residential_FloorLevel'                             => __('Floor Level'),
                'EPC_Residential_FlatTopStorey'                          => __('Flat Top Storey'),
                'EPC_Residential_FlatStoreyCount'                        => __('Flat Storey Count'),
                'EPC_Residential_MainHeatingControls'                    => __('Main Heating Controls'),
                'EPC_Residential_MultiGlazeProportion'                   => __('Multi Glaze Proportion'),
                'EPC_Residential_GlazedType'                             => __('Glazed Type'),
                'EPC_Residential_GlazedArea'                             => __('Glazed Area'),
                'EPC_Residential_ExtensionCount'                         => __('Extension Count'),
                'EPC_Residential_NumberHabitableRooms'                   => __('Number Habitable Rooms'),
                'EPC_Residential_NumberHeatedRooms'                      => __('Number Heated Rooms'),
                'EPC_Residential_LowEnergyLighting'                      => __('Low Energy Lighting'),
                'EPC_Residential_NumberOpenFireplaces'                   => __('Number Open Fireplaces'),
                'EPC_Residential_HotWaterDescription'                    => __('Hot Water Description'),
                'EPC_Residential_HotWaterEnergyEfficiency'               => __('Hot Water Energy Efficiency'),
                'EPC_Residential_HotWaterEnvironmentalEfficiency'        => __('Hot Water Environmental Efficiency'),
                'EPC_Residential_FloorDescription'                       => __('Floor Description'),
                'EPC_Residential_FloorEnergyEfficiency'                  => __('Floor Energy Efficiency'),
                'EPC_Residential_FloorEnvironmentalEfficiency'           => __('Floor Environmental Efficiency'),
                'EPC_Residential_WindowsDescription'                     => __('Windows Description'),
                'EPC_Residential_WindowsEnergyEfficiency'                => __('Windows Energy Efficiency'),
                'EPC_Residential_WindowsEnvironmentalEfficiency'         => __('Windows Environmental Efficiency'),
                'EPC_Residential_WallsDescription'                       => __('Walls Description'),
                'EPC_Residential_WallsEnergyEfficiency'                  => __('Walls Energy Efficiency'),
                'EPC_Residential_WallsEnvironmentalEfficiency'           => __('Walls Environmental Efficiency'),
                'EPC_Residential_SecondaryHeatDescription'               => __('Secondary Heat Description'),
                'EPC_Residential_SheatingEnergyEfficiency'               => __('Sheating Energy Efficiency'),
                'EPC_Residential_SheatingEnvironmentalEfficiency'        => __('Sheating Environmental Efficiency'),
                'EPC_Residential_RoofDescription'                        => __('Roof Description'),
                'EPC_Residential_RoofEnergyEfficiency'                   => __('Roof Energy Efficiency'),
                'EPC_Residential_RoofEnvironmentalEfficiency'            => __('Roof Environmental Efficiency'),
                'EPC_Residential_MainHeatDescription'                    => __('Main Heat Description'),
                'EPC_Residential_MainHeatEnergyEfficiency'               => __('Main Heat Energy Efficiency'),
                'EPC_Residential_MainHeatEnvironmentalEfficiency'        => __('Main Heat Environmental Efficiency'),
                'EPC_Residential_MainHeatControlsDescription'            => __('Main Heat Controls Description'),
                'EPC_Residential_MainHeatControlsEnergyEfficiency'       => __('Main Heat Controls Energy Efficiency'),
                'EPC_Residential_MainHeatControlsEnvironmentalEfficiency' => __('Main Heat Controls Environmental Efficiency'),
                'EPC_Residential_LightingDescription'                    => __('Lighting Description'),
                'EPC_Residential_LightingEnergyEfficiency'               => __('Lighting Energy Efficiency'),
                'EPC_Residential_LightingEnvironmentalEfficiency'        => __('Lighting Environmental Efficiency'),
                'EPC_Residential_MainFuel'                               => __('Main Fuel'),
                'EPC_Residential_WindTurbineCount'                       => __('Wind Turbine Count'),
                'EPC_Residential_HeatLossCorridor'                       => __('Heat Loss Corridor'),
                'EPC_Residential_UnheatedCorridorLength'                 => __('Unheated Corridor Length'),
                'EPC_Residential_FloorHeight'                            => __('Floor Height'),
                'EPC_Residential_PhotoSupply'                            => __('Photo Supply'),
                'EPC_Residential_SolarWaterHeatingFlag'                  => __('Solar Water Heating Flag'),
                'EPC_Residential_MechanicalVentilation'                  => __('Mechanical Ventilation'),
                'EPC_Residential_ConstructionAgeBand'                    => __('Construction Age Band'),
                'EPC_Residential_Tenure'                                 => __('Tenure'),
                'EPC_Residential_FixedLightingOutletsCount'              => __('Fixed Lighting Outlets Count'),
                'EPC_Residential_LowEnergyFixedLightCount'               => __('Low Energy Fixed Light Count'),
            ],
            self::CATEGORY_E_P_C_COMMERCIAL => [
                'EPC_Commercial_LMK'                                    => __('LMK'),
                'EPC_Commercial_LodgementDate'                          => __('Lodgement Date'),
                'EPC_Commercial_ExpiryDate'                             => __('Expiry Date'),
                'EPC_Commercial_AssetRatingBand'                        => __('Asset Rating Band'),
                'EPC_Commercial_AssetRating'                            => __('Asset Rating'),
                'EPC_Commercial_PropertyType'                           => __('Property Type'),
                'EPC_Commercial_InspectionDate'                         => __('Inspection Date'),
                'EPC_Commercial_TransactionType'                        => __('Transaction Type'),
                'EPC_Commercial_NewBuildBenchmark'                      => __('New Build Benchmark'),
                'EPC_Commercial_ExistingStockBenchmark'                 => __('Existing Stock Benchmark'),
                'EPC_Commercial_BuildingLevel'                          => __('Building Level'),
                'EPC_Commercial_MainHeatingFuel'                        => __('Main Heating Fuel'),
                'EPC_Commercial_OtherFuelDescription'                   => __('Other Fuel Description'),
                'EPC_Commercial_SpecialEnergyUses'                      => __('Special Energy Uses'),
                'EPC_Commercial_RenewableSources'                       => __('Renewable Sources'),
                'EPC_Commercial_FloorArea'                              => __('Floor Area'),
                'EPC_Commercial_StandardEmissions'                      => __('Standard Emissions'),
                'EPC_Commercial_TargetEmissions'                        => __('Target Emissions'),
                'EPC_Commercial_TypicalEmissions'                       => __('Typical Emissions'),
                'EPC_Commercial_BuildingEmissions'                      => __('Building Emissions'),
                'EPC_Commercial_AirconPresent'                          => __('Aircon Present'),
                'EPC_Commercial_AirconKWRating'                         => __('Aircon KW Rating'),
                'EPC_Commercial_EstimatedAirconKWRating'                => __('Estimated Aircon KW Rating'),
                'EPC_Commercial_AcInspectionCommissioned'               => __('Ac Inspection Commissioned'),
                'EPC_Commercial_BuildingEnvironment'                    => __('Building Environment'),
                'EPC_Commercial_PrimaryEnergyValue'                     => __('Primary Energy Value'),
            ],
            self::CATEGORY_PROPERTY_ATTRIBUTES => [
                'PropertyAttributes_LoneParent'                             => __('Lone Parent'),
                'PropertyAttributes_NumKids'                                => __('Num Kids'),
                'PropertyAttributes_PropertyLifeStage'                      => __('Property LifeStage'),
                'PropertyAttributes_HouseHoldComposition'                   => __('HouseHold Composition'),
                'PropertyAttributes_HouseHoldSize'                          => __('HouseHold Size'),
                'PropertyAttributes_HouseHoldChild_0_4'                     => __('HouseHold Child_0_4'),
                'PropertyAttributes_HouseHoldChild_5_7'                     => __('HouseHold Child_5_7'),
                'PropertyAttributes_HouseHoldChild_8_10'                    => __('HouseHold Child_8_10'),
                'PropertyAttributes_HouseHoldChild_11_16'                   => __('HouseHold Child_11_16'),
                'PropertyAttributes_HouseHoldChild_17_21'                   => __('HouseHold Child_17_21'),
                'PropertyAttributes_HomeOwnership'                          => __('Home Ownership'),
                'PropertyAttributes_HavePets'                               => __('Have Pets'),
                'PropertyAttributes_HaveDog'                                => __('Have Dog'),
                'PropertyAttributes_HaveCat'                                => __('Have Cat'),
                'PropertyAttributes_RenewalMonthHome'                       => __('Renewal Month Home'),
                'PropertyAttributes_RenewalMonthContents'                   => __('Renewal Month Contents'),
                'PropertyAttributes_RenewalMonthBuilding'                   => __('Renewal Month Building'),
                'PropertyAttributes_RenewalMonthMotor'                      => __('Renewal Month Motor'),
                'PropertyAttributes_RenewalMonthCar'                        => __('Renewal Month Car'),
                'PropertyAttributes_RenewalMonthVan'                        => __('Renewal Month Van'),
                'PropertyAttributes_RenewalMonthPets'                       => __('Renewal Month Pets'),
                'PropertyAttributes_RenewalMonthTravel'                     => __('Renewal Month Travel'),
                'PropertyAttributes_RenewalMonthBike'                       => __('Renewal Month Bike'),
                'PropertyAttributes_ResType'                                => __('Res Type'),
                'PropertyAttributes_Bedrooms'                               => __('Bedrooms'),
                'PropertyAttributes_TotalRooms'                             => __('Total Rooms'),
                'PropertyAttributes_YearOfBuild'                            => __('Year Of Build'),
                'PropertyAttributes_CurrentPropValue'                       => __('Current Prop Value'),
                'PropertyAttributes_CurrentListingStatus'                   => __('Current Listing Status'),
                'PropertyAttributes_LastTransactionDate'                    => __('Last Transaction Date'),
                'PropertyAttributes_HouseValueBand'                         => __('House Value Band'),
                'PropertyAttributes_Listed'                                 => __('Listed'),
                'PropertyAttributes_Watercourse200M'                        => __('Watercourse 200M'),
                'PropertyAttributes_DistanceToWatercourse'                  => __('Distance To Watercourse'),
                'PropertyAttributes_DistanceToRoad'                         => __('Distance To Road'),
                'PropertyAttributes_DistanceToTree'                         => __('Distance To Tree'),
                'PropertyAttributes_BurglaryRate'                           => __('Burglary Rate'),
                'PropertyAttributes_MainFuel'                               => __('Main Fuel'),
                'PropertyAttributes_WallType'                               => __('Wall Type'),
                'PropertyAttributes_HeatingType'                            => __('Heating Type'),
                'PropertyAttributes_RoofType'                               => __('Roof Type'),
                'PropertyAttributes_AvgRoofSlope'                           => __('Avg Roof Slope'),
                'PropertyAttributes_FlatRoofFraction'                       => __('Flat Roof Fraction'),
                'PropertyAttributes_NumberOfBathrooms'                      => __('Number Of Bathrooms'),
                'PropertyAttributes_HomeContentsCoverValue'                 => __('Home Contents Cover Value'),
                'PropertyAttributes_BuildingConstructionPeriod'             => __('Building Construction Period'),
                'PropertyAttributes_Bungalow'                               => __('Bungalow'),
                'PropertyAttributes_EstimatedPropertyValue'                 => __('Estimated Property Value'),
                'PropertyAttributes_PVLowerConfidenceLimit95'               => __('PV Lower Confidence Limit 95'),
                'PropertyAttributes_PVUpperConfidenceLimit95'               => __('PV Upper Confidence Limit 95'),
                'PropertyAttributes_EstimatedYearBuilt'                     => __('Estimated Year Built'),
                'PropertyAttributes_EstimatedYearBuiltLowerLimit'           => __('Estimated Year Built Lower Limit'),
                'PropertyAttributes_EstimatedYearBuiltUpperLimit'           => __('Estimated Year Built Upper Limit'),
            ],
            self::CATEGORY_COMPANIES_HOUSE => [
                'CompanyHouse'                           => __('Company House'),
                'CompanyName'                            => __('Company Name'),
                'CompanyNumber'                          => __('Company Number'),
                'CompanyCategory'                        => __('Company Category'),
                'CompanyStatus'                          => __('Company Status'),
                'CountryOfOrigin'                        => __('Country Of Origin'),
                'DissolutionDate'                        => __('Dissolution Date'),
                'IncorporationDate'                      => __('Incorporation Date'),
                'AccountingRefDay'                       => __('Accounting Ref Day'),
                'AccountingRefMonth'                     => __('Accounting Ref Month'),
                'AccountsNextDueDate'                    => __('Accounts Next Due Date'),
                'AccountsLastMadeUpDate'                 => __('Accounts Last Made UpDate'),
                'AccountsCategory'                       => __('Accounts Category'),
                'ReturnsNextDueDate'                     => __('Returns Next Due Date'),
                'ReturnsLastMadeUpDate'                  => __('Returns Last Made UpDate'),
                'NumberMortageCharges'                   => __('Number Mortage Charges'),
                'NumberMortageOutstanding'               => __('Number Mortage Outstanding'),
                'NumberMortagePartSatisfied'             => __('Number Mortage Part Satisfied'),
                'NumberMortageSatisfied'                 => __('Number Mortage Satisfied'),
                'SicCode1'                               => __('Sic Code 1'),
                'SicCode2'                               => __('Sic Code 2'),
                'SicCode3'                               => __('Sic Code 3'),
                'SicCode4'                               => __('Sic Code 4'),
                'NumberGeneralPartners'                  => __('Number General Partners'),
                'NumberLimitedPartners'                  => __('Number Limited Partners'),
                'PreviousNames'                          => __('Previous Names'),
                'ConfStmtNextDueDate'                    => __('Conf Stmt Next Due Date'),
                'ConfStmtLastMadeUpDate'                 => __('Conf Stmt Last Made UpDate'),
            ],
        ];
    }

    /**
     * Get all fields as a flat array
     *
     * @return array
     */
    public function getAllFields(): array
    {
        $allFields = [];
        foreach ($this->getFieldsByCategory() as $category => $fields) {
            foreach ($fields as $value => $label) {
                $allFields[$value] = $label;
            }
        }

        return $allFields;
    }

    /**
     * Options getter - returns a flat list for backward compatibility
     *
     * @return array
     */
    public function toOptionArray()
    {
        $options = [];
        foreach ($this->getFieldsByCategory() as $categoryCode => $category) {
            $options[] = [
                'label' => $category['label'],
                'value' => $categoryCode
            ];
        }
        return $options;
    }
    
    /**
     * Get options in "key-value" format
     *
     * @return array
     */
    public function toArray()
    {
        return $this->getAllFields();
    }
    
    /**
     * Get all metadata fields as a flat array
     *
     * @return array Associative array of field code => field data
     */
    public function getAllFieldsFlat(): array
    {
        $fields = [];
        
        foreach ($this->getFieldsByCategory() as $categoryCode => $categoryFields) {
            // Each category contains a direct mapping of field code => field label
            foreach ($categoryFields as $fieldCode => $fieldLabel) {
                $fields[$fieldCode] = [
                    'value' => $fieldCode,
                    'label' => $fieldLabel
                ];
            }
        }
        
        return $fields;
    }
}
