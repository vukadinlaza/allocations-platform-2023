export const countries = [
  'Afghanistan',
  'Åland Islands',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo, The Democratic Republic of the',
  'Cook Islands',
  'Costa Rica',
  "Cote D'Ivoire",
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands (Malvinas)',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Heard Island and Mcdonald Islands',
  'Holy See (Vatican City State)',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran, Islamic Republic Of',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  "Democratic People's Republic of Korea",
  'Korea, Republic of',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  "Lao People's Democratic Republic",
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libyan Arab Jamahiriya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Macedonia, The Former Yugoslav Republic of',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia, Federated States of',
  'Moldova, Republic of',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'Netherlands Antilles',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'Northern Mariana Islands',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestinian Territory, Occupied',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Pitcairn',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'Saint Helena',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Pierre and Miquelon',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia and the South Sandwich Islands',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Svalbard and Jan Mayen',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syrian Arab Republic',
  'Taiwan',
  'Tajikistan',
  'Tanzania, United Republic of',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'United States Minor Outlying Islands',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Viet Nam',
  'Virgin Islands, British',
  'Virgin Islands, U.S.',
  'Wallis and Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe'
];

export const form_models = {
  deals: {
    element: 'deal',
    table: 'deals',
    model: [
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        show: true
      }
    ]
  },
  organizations: {
    element: 'organization',
    table: 'organizations',
    model: [
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        show: true
      }
    ]
  }
};

export const headers_tables = {
  entities: [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Tax status',
      key: 'tax_status',
      type: 'chip'
    },
    {
      label: 'Updated date',
      key: 'created_at',
      type: 'date'
    },
    {
      label: 'EIN',
      key: 'ein'
    }
  ],
  funds: [
    {
      label: 'Name',
      key: 'name',
      type: 'string'
    },
    {
      label: 'Total raised',
      key: 'total_raised_amount',
      type: 'price'
    },
    {
      label: 'Status',
      key: 'status',
      type: 'chip'
    },
    {
      label: '',
      manage: true
    }
  ],
  investments: [
    {
      label: 'Deal name',
      key: 'deal_name',
      type: 'string'
    },
    {
      label: 'Investment amount',
      key: 'subscription_amount',
      type: 'price'
    },
    {
      label: 'Status',
      key: 'status',
      type: 'chip'
    },
    {
      label: '',
      target: '_blank',
      manage: true
    }
  ],
  investments_entities: [
    {
      label: 'Name',
      key: 'legal_name',
      type: 'string',
      show: true
    },
    {
      label: 'Type',
      key: 'type',
      type: 'string',
      show: true
    },
    {
      label: 'Creation date',
      key: 'created_at',
      type: 'date',
      show: true
    },
    {
      label: 'Type',
      key: 'type',
      type: 'string',
      show: true
    },
    {
      label: 'Tax ID',
      key: 'tax_id',
      type: 'string',
      show: true
    },
    {
      label: 'Status',
      key: 'kyc_status',
      type: 'chip',
      show: true
    }
  ],
  migrations: [
    {
      label: 'Name',
      key: 'name',
      type: 'string'
    },
    {
      label: 'Total raised',
      key: 'total_raised_amount',
      type: 'price'
    },
    {
      label: 'Status',
      key: 'status',
      type: 'chip'
    },
    {
      label: '',
      manage: true
    }
  ],
  organizations: [
    {
      label: 'Name',
      key: 'name',
      type: 'string'
    },
    {
      label: 'Total deals',
      key: 'deals.0.count',
      type: 'count'
    }
  ],
  personal_identities: [
    {
      label: 'Legal name',
      key: 'legal_name'
    },
    {
      label: 'Address',
      key: 'address'
    },
    {
      label: 'City',
      key: 'city'
    },
    {
      label: 'State',
      key: 'state'
    },
    {
      label: 'Country',
      key: 'country'
    },
    {
      label: 'Phone',
      key: 'phone_number'
    },
    {
      label: 'Tax ID',
      key: 'tax_id'
    }
  ],
  spvs: [
    {
      label: 'Name',
      key: 'name',
      type: 'string'
    },
    {
      label: 'Total raised',
      key: 'total_raised_amount',
      type: 'price'
    },
    {
      label: 'Status',
      key: 'status',
      type: 'chip'
    },
    {
      label: '',
      manage: true
    }
  ]
};

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Investments', href: '/investments' },
  { name: 'SPVs', href: '/spvs' },
  { name: 'Funds', href: '/funds' },
  { name: 'Organizations', href: '/organizations' },
  { name: 'Migrations', href: '/migrations' }
];
