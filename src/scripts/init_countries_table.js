const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({path: path.join(__dirname, '../../.env.production')});
} else if (process.env.NODE_ENV === 'develop' ||
              process.env.NODE_ENV === undefined) {
  dotenv.config({path: path.join(__dirname, '../../.env.develop')});
} else {
  throw new Error('process.env.NODE_ENV를 올바르게 설정해주세요!');
}

const dataList = [
  {
    'fullName': 'Afghanistan',
    'countryCode': 'AF',
  },
  {
    'fullName': 'Albania',
    'countryCode': 'AL',
  },
  {
    'fullName': 'Algeria',
    'countryCode': 'DZ',
  },
  {
    'fullName': 'American Samoa',
    'countryCode': 'AS',
  },
  {
    'fullName': 'Andorra',
    'countryCode': 'AD',
  },
  {
    'fullName': 'Angola',
    'countryCode': 'AO',
  },
  {
    'fullName': 'Anguilla',
    'countryCode': 'AI',
  },
  {
    'fullName': 'Antarctica',
    'countryCode': 'AQ',
  },
  {
    'fullName': 'Antigua and Barbuda',
    'countryCode': 'AG',
  },
  {
    'fullName': 'Argentina',
    'countryCode': 'AR',
  },
  {
    'fullName': 'Armenia',
    'countryCode': 'AM',
  },
  {
    'fullName': 'Aruba',
    'countryCode': 'AW',
  },
  {
    'fullName': 'Australia',
    'countryCode': 'AU',
  },
  {
    'fullName': 'Austria',
    'countryCode': 'AT',
  },
  {
    'fullName': 'Azerbaijan',
    'countryCode': 'AZ',
  },
  {
    'fullName': 'Bahamas (the)',
    'countryCode': 'BS',
  },
  {
    'fullName': 'Bahrain',
    'countryCode': 'BH',
  },
  {
    'fullName': 'Bangladesh',
    'countryCode': 'BD',
  },
  {
    'fullName': 'Barbados',
    'countryCode': 'BB',
  },
  {
    'fullName': 'Belarus',
    'countryCode': 'BY',
  },
  {
    'fullName': 'Belgium',
    'countryCode': 'BE',
  },
  {
    'fullName': 'Belize',
    'countryCode': 'BZ',
  },
  {
    'fullName': 'Benin',
    'countryCode': 'BJ',
  },
  {
    'fullName': 'Bermuda',
    'countryCode': 'BM',
  },
  {
    'fullName': 'Bhutan',
    'countryCode': 'BT',
  },
  {
    'fullName': 'Bolivia (Plurinational State of)',
    'countryCode': 'BO',
  },
  {
    'fullName': 'Bonaire, Sint Eustatius and Saba',
    'countryCode': 'BQ',
  },
  {
    'fullName': 'Bosnia and Herzegovina',
    'countryCode': 'BA',
  },
  {
    'fullName': 'Botswana',
    'countryCode': 'BW',
  },
  {
    'fullName': 'Bouvet Island',
    'countryCode': 'BV',
  },
  {
    'fullName': 'Brazil',
    'countryCode': 'BR',
  },
  {
    'fullName': 'British Indian Ocean Territory (the)',
    'countryCode': 'IO',
  },
  {
    'fullName': 'Brunei Darussalam',
    'countryCode': 'BN',
  },
  {
    'fullName': 'Bulgaria',
    'countryCode': 'BG',
  },
  {
    'fullName': 'Burkina Faso',
    'countryCode': 'BF',
  },
  {
    'fullName': 'Burundi',
    'countryCode': 'BI',
  },
  {
    'fullName': 'Cabo Verde',
    'countryCode': 'CV',
  },
  {
    'fullName': 'Cambodia',
    'countryCode': 'KH',
  },
  {
    'fullName': 'Cameroon',
    'countryCode': 'CM',
  },
  {
    'fullName': 'Canada',
    'countryCode': 'CA',
  },
  {
    'fullName': 'Cayman Islands (the)',
    'countryCode': 'KY',
  },
  {
    'fullName': 'Central African Republic (the)',
    'countryCode': 'CF',
  },
  {
    'fullName': 'Chad',
    'countryCode': 'TD',
  },
  {
    'fullName': 'Chile',
    'countryCode': 'CL',
  },
  {
    'fullName': 'China',
    'countryCode': 'CN',
  },
  {
    'fullName': 'Christmas Island',
    'countryCode': 'CX',
  },
  {
    'fullName': 'Cocos (Keeling) Islands (the)',
    'countryCode': 'CC',
  },
  {
    'fullName': 'Colombia',
    'countryCode': 'CO',
  },
  {
    'fullName': 'Comoros (the)',
    'countryCode': 'KM',
  },
  {
    'fullName': 'Congo (the Democratic Republic of the)',
    'countryCode': 'CD',
  },
  {
    'fullName': 'Congo (the)',
    'countryCode': 'CG',
  },
  {
    'fullName': 'Cook Islands (the)',
    'countryCode': 'CK',
  },
  {
    'fullName': 'Costa Rica',
    'countryCode': 'CR',
  },
  {
    'fullName': 'Croatia',
    'countryCode': 'HR',
  },
  {
    'fullName': 'Cuba',
    'countryCode': 'CU',
  },
  {
    'fullName': 'Curaçao',
    'countryCode': 'CW',
  },
  {
    'fullName': 'Cyprus',
    'countryCode': 'CY',
  },
  {
    'fullName': 'Czechia',
    'countryCode': 'CZ',
  },
  {
    'fullName': 'Côte d\'Ivoire',
    'countryCode': 'CI',
  },
  {
    'fullName': 'Denmark',
    'countryCode': 'DK',
  },
  {
    'fullName': 'Djibouti',
    'countryCode': 'DJ',
  },
  {
    'fullName': 'Dominica',
    'countryCode': 'DM',
  },
  {
    'fullName': 'Dominican Republic (the)',
    'countryCode': 'DO',
  },
  {
    'fullName': 'Ecuador',
    'countryCode': 'EC',
  },
  {
    'fullName': 'Egypt',
    'countryCode': 'EG',
  },
  {
    'fullName': 'El Salvador',
    'countryCode': 'SV',
  },
  {
    'fullName': 'Equatorial Guinea',
    'countryCode': 'GQ',
  },
  {
    'fullName': 'Eritrea',
    'countryCode': 'ER',
  },
  {
    'fullName': 'Estonia',
    'countryCode': 'EE',
  },
  {
    'fullName': 'Eswatini',
    'countryCode': 'SZ',
  },
  {
    'fullName': 'Ethiopia',
    'countryCode': 'ET',
  },
  {
    'fullName': 'Falkland Islands (the) [Malvinas]',
    'countryCode': 'FK',
  },
  {
    'fullName': 'Faroe Islands (the)',
    'countryCode': 'FO',
  },
  {
    'fullName': 'Fiji',
    'countryCode': 'FJ',
  },
  {
    'fullName': 'Finland',
    'countryCode': 'FI',
  },
  {
    'fullName': 'France',
    'countryCode': 'FR',
  },
  {
    'fullName': 'French Guiana',
    'countryCode': 'GF',
  },
  {
    'fullName': 'French Polynesia',
    'countryCode': 'PF',
  },
  {
    'fullName': 'French Southern Territories (the)',
    'countryCode': 'TF',
  },
  {
    'fullName': 'Gabon',
    'countryCode': 'GA',
  },
  {
    'fullName': 'Gambia (the)',
    'countryCode': 'GM',
  },
  {
    'fullName': 'Georgia',
    'countryCode': 'GE',
  },
  {
    'fullName': 'Germany',
    'countryCode': 'DE',
  },
  {
    'fullName': 'Ghana',
    'countryCode': 'GH',
  },
  {
    'fullName': 'Gibraltar',
    'countryCode': 'GI',
  },
  {
    'fullName': 'Greece',
    'countryCode': 'GR',
  },
  {
    'fullName': 'Greenland',
    'countryCode': 'GL',
  },
  {
    'fullName': 'Grenada',
    'countryCode': 'GD',
  },
  {
    'fullName': 'Guadeloupe',
    'countryCode': 'GP',
  },
  {
    'fullName': 'Guam',
    'countryCode': 'GU',
  },
  {
    'fullName': 'Guatemala',
    'countryCode': 'GT',
  },
  {
    'fullName': 'Guernsey',
    'countryCode': 'GG',
  },
  {
    'fullName': 'Guinea',
    'countryCode': 'GN',
  },
  {
    'fullName': 'Guinea-Bissau',
    'countryCode': 'GW',
  },
  {
    'fullName': 'Guyana',
    'countryCode': 'GY',
  },
  {
    'fullName': 'Haiti',
    'countryCode': 'HT',
  },
  {
    'fullName': 'Heard Island and McDonald Islands',
    'countryCode': 'HM',
  },
  {
    'fullName': 'Holy See (the)',
    'countryCode': 'VA',
  },
  {
    'fullName': 'Honduras',
    'countryCode': 'HN',
  },
  {
    'fullName': 'Hong Kong',
    'countryCode': 'HK',
  },
  {
    'fullName': 'Hungary',
    'countryCode': 'HU',
  },
  {
    'fullName': 'Iceland',
    'countryCode': 'IS',
  },
  {
    'fullName': 'India',
    'countryCode': 'IN',
  },
  {
    'fullName': 'Indonesia',
    'countryCode': 'ID',
  },
  {
    'fullName': 'Iran (Islamic Republic of)',
    'countryCode': 'IR',
  },
  {
    'fullName': 'Iraq',
    'countryCode': 'IQ',
  },
  {
    'fullName': 'Ireland',
    'countryCode': 'IE',
  },
  {
    'fullName': 'Isle of Man',
    'countryCode': 'IM',
  },
  {
    'fullName': 'Israel',
    'countryCode': 'IL',
  },
  {
    'fullName': 'Italy',
    'countryCode': 'IT',
  },
  {
    'fullName': 'Jamaica',
    'countryCode': 'JM',
  },
  {
    'fullName': 'Japan',
    'countryCode': 'JP',
  },
  {
    'fullName': 'Jersey',
    'countryCode': 'JE',
  },
  {
    'fullName': 'Jordan',
    'countryCode': 'JO',
  },
  {
    'fullName': 'Kazakhstan',
    'countryCode': 'KZ',
  },
  {
    'fullName': 'Kenya',
    'countryCode': 'KE',
  },
  {
    'fullName': 'Kiribati',
    'countryCode': 'KI',
  },
  {
    'fullName': 'Korea (the Democratic People\'s Republic of)',
    'countryCode': 'KP',
  },
  {
    'fullName': 'Korea (the Republic of)',
    'countryCode': 'KR',
  },
  {
    'fullName': 'Kuwait',
    'countryCode': 'KW',
  },
  {
    'fullName': 'Kyrgyzstan',
    'countryCode': 'KG',
  },
  {
    'fullName': 'Lao People\'s Democratic Republic (the)',
    'countryCode': 'LA',
  },
  {
    'fullName': 'Latvia',
    'countryCode': 'LV',
  },
  {
    'fullName': 'Lebanon',
    'countryCode': 'LB',
  },
  {
    'fullName': 'Lesotho',
    'countryCode': 'LS',
  },
  {
    'fullName': 'Liberia',
    'countryCode': 'LR',
  },
  {
    'fullName': 'Libya',
    'countryCode': 'LY',
  },
  {
    'fullName': 'Liechtenstein',
    'countryCode': 'LI',
  },
  {
    'fullName': 'Lithuania',
    'countryCode': 'LT',
  },
  {
    'fullName': 'Luxembourg',
    'countryCode': 'LU',
  },
  {
    'fullName': 'Macao',
    'countryCode': 'MO',
  },
  {
    'fullName': 'Madagascar',
    'countryCode': 'MG',
  },
  {
    'fullName': 'Malawi',
    'countryCode': 'MW',
  },
  {
    'fullName': 'Malaysia',
    'countryCode': 'MY',
  },
  {
    'fullName': 'Maldives',
    'countryCode': 'MV',
  },
  {
    'fullName': 'Mali',
    'countryCode': 'ML',
  },
  {
    'fullName': 'Malta',
    'countryCode': 'MT',
  },
  {
    'fullName': 'Marshall Islands (the)',
    'countryCode': 'MH',
  },
  {
    'fullName': 'Martinique',
    'countryCode': 'MQ',
  },
  {
    'fullName': 'Mauritania',
    'countryCode': 'MR',
  },
  {
    'fullName': 'Mauritius',
    'countryCode': 'MU',
  },
  {
    'fullName': 'Mayotte',
    'countryCode': 'YT',
  },
  {
    'fullName': 'Mexico',
    'countryCode': 'MX',
  },
  {
    'fullName': 'Micronesia (Federated States of)',
    'countryCode': 'FM',
  },
  {
    'fullName': 'Moldova (the Republic of)',
    'countryCode': 'MD',
  },
  {
    'fullName': 'Monaco',
    'countryCode': 'MC',
  },
  {
    'fullName': 'Mongolia',
    'countryCode': 'MN',
  },
  {
    'fullName': 'Montenegro',
    'countryCode': 'ME',
  },
  {
    'fullName': 'Montserrat',
    'countryCode': 'MS',
  },
  {
    'fullName': 'Morocco',
    'countryCode': 'MA',
  },
  {
    'fullName': 'Mozambique',
    'countryCode': 'MZ',
  },
  {
    'fullName': 'Myanmar',
    'countryCode': 'MM',
  },
  {
    'fullName': 'Namibia',
    'countryCode': 'NA',
  },
  {
    'fullName': 'Nauru',
    'countryCode': 'NR',
  },
  {
    'fullName': 'Nepal',
    'countryCode': 'NP',
  },
  {
    'fullName': 'Netherlands (the)',
    'countryCode': 'NL',
  },
  {
    'fullName': 'New Caledonia',
    'countryCode': 'NC',
  },
  {
    'fullName': 'New Zealand',
    'countryCode': 'NZ',
  },
  {
    'fullName': 'Nicaragua',
    'countryCode': 'NI',
  },
  {
    'fullName': 'Niger (the)',
    'countryCode': 'NE',
  },
  {
    'fullName': 'Nigeria',
    'countryCode': 'NG',
  },
  {
    'fullName': 'Niue',
    'countryCode': 'NU',
  },
  {
    'fullName': 'Norfolk Island',
    'countryCode': 'NF',
  },
  {
    'fullName': 'Northern Mariana Islands (the)',
    'countryCode': 'MP',
  },
  {
    'fullName': 'Norway',
    'countryCode': 'NO',
  },
  {
    'fullName': 'Oman',
    'countryCode': 'OM',
  },
  {
    'fullName': 'Pakistan',
    'countryCode': 'PK',
  },
  {
    'fullName': 'Palau',
    'countryCode': 'PW',
  },
  {
    'fullName': 'Palestine, State of',
    'countryCode': 'PS',
  },
  {
    'fullName': 'Panama',
    'countryCode': 'PA',
  },
  {
    'fullName': 'Papua New Guinea',
    'countryCode': 'PG',
  },
  {
    'fullName': 'Paraguay',
    'countryCode': 'PY',
  },
  {
    'fullName': 'Peru',
    'countryCode': 'PE',
  },
  {
    'fullName': 'Philippines (the)',
    'countryCode': 'PH',
  },
  {
    'fullName': 'Pitcairn',
    'countryCode': 'PN',
  },
  {
    'fullName': 'Poland',
    'countryCode': 'PL',
  },
  {
    'fullName': 'Portugal',
    'countryCode': 'PT',
  },
  {
    'fullName': 'Puerto Rico',
    'countryCode': 'PR',
  },
  {
    'fullName': 'Qatar',
    'countryCode': 'QA',
  },
  {
    'fullName': 'Republic of North Macedonia',
    'countryCode': 'MK',
  },
  {
    'fullName': 'Romania',
    'countryCode': 'RO',
  },
  {
    'fullName': 'Russian Federation (the)',
    'countryCode': 'RU',
  },
  {
    'fullName': 'Rwanda',
    'countryCode': 'RW',
  },
  {
    'fullName': 'Réunion',
    'countryCode': 'RE',
  },
  {
    'fullName': 'Saint Barthélemy',
    'countryCode': 'BL',
  },
  {
    'fullName': 'Saint Helena, Ascension and Tristan da Cunha',
    'countryCode': 'SH',
  },
  {
    'fullName': 'Saint Kitts and Nevis',
    'countryCode': 'KN',
  },
  {
    'fullName': 'Saint Lucia',
    'countryCode': 'LC',
  },
  {
    'fullName': 'Saint Martin (French part)',
    'countryCode': 'MF',
  },
  {
    'fullName': 'Saint Pierre and Miquelon',
    'countryCode': 'PM',
  },
  {
    'fullName': 'Saint Vincent and the Grenadines',
    'countryCode': 'VC',
  },
  {
    'fullName': 'Samoa',
    'countryCode': 'WS',
  },
  {
    'fullName': 'San Marino',
    'countryCode': 'SM',
  },
  {
    'fullName': 'Sao Tome and Principe',
    'countryCode': 'ST',
  },
  {
    'fullName': 'Saudi Arabia',
    'countryCode': 'SA',
  },
  {
    'fullName': 'Senegal',
    'countryCode': 'SN',
  },
  {
    'fullName': 'Serbia',
    'countryCode': 'RS',
  },
  {
    'fullName': 'Seychelles',
    'countryCode': 'SC',
  },
  {
    'fullName': 'Sierra Leone',
    'countryCode': 'SL',
  },
  {
    'fullName': 'Singapore',
    'countryCode': 'SG',
  },
  {
    'fullName': 'Sint Maarten (Dutch part)',
    'countryCode': 'SX',
  },
  {
    'fullName': 'Slovakia',
    'countryCode': 'SK',
  },
  {
    'fullName': 'Slovenia',
    'countryCode': 'SI',
  },
  {
    'fullName': 'Solomon Islands',
    'countryCode': 'SB',
  },
  {
    'fullName': 'Somalia',
    'countryCode': 'SO',
  },
  {
    'fullName': 'South Africa',
    'countryCode': 'ZA',
  },
  {
    'fullName': 'South Georgia and the South Sandwich Islands',
    'countryCode': 'GS',
  },
  {
    'fullName': 'South Sudan',
    'countryCode': 'SS',
  },
  {
    'fullName': 'Spain',
    'countryCode': 'ES',
  },
  {
    'fullName': 'Sri Lanka',
    'countryCode': 'LK',
  },
  {
    'fullName': 'Sudan (the)',
    'countryCode': 'SD',
  },
  {
    'fullName': 'Suriname',
    'countryCode': 'SR',
  },
  {
    'fullName': 'Svalbard and Jan Mayen',
    'countryCode': 'SJ',
  },
  {
    'fullName': 'Sweden',
    'countryCode': 'SE',
  },
  {
    'fullName': 'Switzerland',
    'countryCode': 'CH',
  },
  {
    'fullName': 'Syrian Arab Republic',
    'countryCode': 'SY',
  },
  {
    'fullName': 'Taiwan (Province of China)',
    'countryCode': 'TW',
  },
  {
    'fullName': 'Tajikistan',
    'countryCode': 'TJ',
  },
  {
    'fullName': 'Tanzania, United Republic of',
    'countryCode': 'TZ',
  },
  {
    'fullName': 'Thailand',
    'countryCode': 'TH',
  },
  {
    'fullName': 'Timor-Leste',
    'countryCode': 'TL',
  },
  {
    'fullName': 'Togo',
    'countryCode': 'TG',
  },
  {
    'fullName': 'Tokelau',
    'countryCode': 'TK',
  },
  {
    'fullName': 'Tonga',
    'countryCode': 'TO',
  },
  {
    'fullName': 'Trinidad and Tobago',
    'countryCode': 'TT',
  },
  {
    'fullName': 'Tunisia',
    'countryCode': 'TN',
  },
  {
    'fullName': 'Turkey',
    'countryCode': 'TR',
  },
  {
    'fullName': 'Turkmenistan',
    'countryCode': 'TM',
  },
  {
    'fullName': 'Turks and Caicos Islands (the)',
    'countryCode': 'TC',
  },
  {
    'fullName': 'Tuvalu',
    'countryCode': 'TV',
  },
  {
    'fullName': 'Uganda',
    'countryCode': 'UG',
  },
  {
    'fullName': 'Ukraine',
    'countryCode': 'UA',
  },
  {
    'fullName': 'United Arab Emirates (the)',
    'countryCode': 'AE',
  },
  {
    'fullName': 'United Kingdom of Great Britain and Northern Ireland (the)',
    'countryCode': 'GB',
  },
  {
    'fullName': 'United States Minor Outlying Islands (the)',
    'countryCode': 'UM',
  },
  {
    'fullName': 'United States of America (the)',
    'countryCode': 'US',
  },
  {
    'fullName': 'Uruguay',
    'countryCode': 'UY',
  },
  {
    'fullName': 'Uzbekistan',
    'countryCode': 'UZ',
  },
  {
    'fullName': 'Vanuatu',
    'countryCode': 'VU',
  },
  {
    'fullName': 'Venezuela (Bolivarian Republic of)',
    'countryCode': 'VE',
  },
  {
    'fullName': 'Viet Nam',
    'countryCode': 'VN',
  },
  {
    'fullName': 'Virgin Islands (British)',
    'countryCode': 'VG',
  },
  {
    'fullName': 'Virgin Islands (U.S.)',
    'countryCode': 'VI',
  },
  {
    'fullName': 'Wallis and Futuna',
    'countryCode': 'WF',
  },
  {
    'fullName': 'Western Sahara',
    'countryCode': 'EH',
  },
  {
    'fullName': 'Yemen',
    'countryCode': 'YE',
  },
  {
    'fullName': 'Zambia',
    'countryCode': 'ZM',
  },
  {
    'fullName': 'Zimbabwe',
    'countryCode': 'ZW',
  },
  {
    'fullName': 'Åland Islands',
    'countryCode': 'AX',
  },
];

const countryService = require('../services/country.service');
const countryCodeToEmoji = require('country-code-emoji').default;
async function main() {
  for (const data of dataList) {
    try {
      await countryService.addCountry(data.countryCode, data.fullName,
          countryCodeToEmoji(data.countryCode));
    } catch (error) {
      console.error(error);
    }
  }
}

main();
