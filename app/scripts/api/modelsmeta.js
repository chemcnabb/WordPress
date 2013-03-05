BWL.ModelMeta.AccessRequest = {
	__cache : 0,
	__perms : {
		Create : 10,
		Read : 10,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	CanRespond : 'Boolean*(10)',
	Key : 'String',
	RequestedAccess : 'ModelAccessTypeEnum*(10)',
	RequestedBy : 'IDomainProfile*(-1)',
	RequestedByKey : 'String*(10)',
	RequestedByName : 'String*(10)',
	RequestedItem : 'IDomainObject*(10)',
	RequestSentToKeys : 'List(String)*(-1)',
	Response : 'AccessRequestResponseEnum*(10)',
	ResponseFrom : 'IDomainProfile*(-1)',
	ResponseFromKey : 'String*(-1)',
	Type : 'String'
};
BWL.ModelMeta.AccountProfile = {
	__cache : 0,
	__perms : {
		Create : 0,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Active : 'Boolean*(0)',
	DomainProfile : 'IDomainProfile',
	Email : 'String*(0)',
	EmailVerified : 'Boolean*(0)',
	FullName : 'String',
	Key : 'String',
	PasswordHash : 'String*(-1)',
	RequestedRole : 'DomainProfileRoleEnum*(-1)',
	Type : 'String'
};
BWL.ModelMeta.Address = {
	__cache : 300,
	__perms : {
		Create : 10,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	AddressLine1 : 'String',
	AddressLine2 : 'String',
	AddressType : 'AddressTypeEnum',
	City : 'String',
	Country : 'String',
	County : 'String',
	District : 'String',
	IsConfirmed : 'Boolean',
	Key : 'String',
	Latitude : 'Double',
	Longitude : 'Double',
	PostalCode : 'String',
	Region : 'String',
	Timezone : 'String',
	Type : 'String'
};
BWL.ModelMeta.APIResponse = {
	__cache : 0,
	Code : 'String',
	DiagnosticsMatrix : 'String',
	ExecutionSeconds : 'Double',
	Message : 'String',
	Object : 'String',
	ServerDateTime : 'DateTime',
	Type : 'String'
};
BWL.ModelMeta.Cart = {
	__cache : 0,
	__perms : {
		Create : 10,
		Read : 30,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Currency : 'String',
	ExpiryDateTime : 'DateTime',
	Fees : 'Price',
	InventoryItems : 'List(IInventoryItemBase)',
	Key : 'String',
	Payment : 'IPaymentSession',
	ProfileKey : 'String',
	RequiresShipping : 'Boolean',
	Shipping : 'Price',
	ShippingAddress : 'IAddress',
	State : 'CartStateEnum',
	SubTotal : 'Price',
	Taxes : 'Price',
	Total : 'Price',
	Type : 'String'
};
BWL.ModelMeta.Category = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	ChildCategories : 'List(ICategory)',
	CustomURI : 'ICustomURI',
	Description : 'Text',
	DisplayOrder : 'Int32',
	Image : 'IImage',
	Key : 'String',
	Name : 'String',
	ParentCategoryKey : 'String',
	RankingScore : 'Int32',
	SmallImage : 'IImage:150:150',
	Type : 'String'
};
BWL.ModelMeta.City = {
	__cache : 3600,
	__perms : {
		Create : 70,
		Read : 0,
		Update : 70,
		Delete : 100,
		Remove : 70
	},
	CountryISO : 'String',
	geonameId : 'String',
	Key : 'String',
	Latitude : 'Double',
	Longitude : 'Double',
	Name : 'String',
	NameUpper : 'String',
	NameUTF8 : 'String',
	Population : 'Int64',
	Region : 'IRegion',
	RegionCode : 'String',
	RegionISO : 'String',
	Timezone : 'ITimezone',
	TimezoneName : 'String',
	Type : 'String'
};
BWL.ModelMeta.ClientApplicationInfo = {
	__cache : 0,
	Key : 'String',
	Name : 'String',
	Secret : 'String',
	Type : 'String'
};
BWL.ModelMeta.Contact = {
	__cache : 300,
	__perms : {
		Create : 10,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Addresses : 'List(IAddress)',
	AlternativePhone : 'String',
	CompanyName : 'String',
	ContactRole : 'ContactRoleEnum',
	DateOfBirth : 'DateTime',
	EmailAddress : 'String',
	Facsimile : 'String',
	FullName : 'String',
	Gender : 'GenderEnum',
	Image : 'IImage',
	Key : 'String',
	Phone : 'String',
	PreferredName : 'String',
	Type : 'String',
	WebAddress : 'String'
};
BWL.ModelMeta.ContainerConfiguration = {
	__cache : 0,
	__perms : {
		Create : 100,
		Read : 0,
		Update : 100,
		Delete : 100,
		Remove : 100
	},
	ConfigurationKey : 'String',
	Host : 'String',
	Key : 'String',
	Type : 'String',
	Value : 'String'
};
BWL.ModelMeta.Continent = {
	__cache : 3600,
	__perms : {
		Create : 70,
		Read : 0,
		Update : 70,
		Delete : 100,
		Remove : 70
	},
	geonameId : 'String',
	ISO : 'String',
	Key : 'String',
	Name : 'String',
	Type : 'String'
};
BWL.ModelMeta.Copyright = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Contacts : 'List(IContact)',
	HolderName : 'String',
	Key : 'String',
	Type : 'String'
};
BWL.ModelMeta.Country = {
	__cache : 3600,
	__perms : {
		Create : 70,
		Read : 0,
		Update : 70,
		Delete : 100,
		Remove : 70
	},
	AreaSqKM : 'Int32',
	Capital : 'String',
	ContinentISO : 'String',
	CurrencyCode : 'String',
	CurrencyName : 'String',
	Fips : 'String',
	geonameId : 'String',
	HasCities : 'Boolean',
	HasPostalCodes : 'Boolean',
	HasRegions : 'Boolean',
	ISO : 'String',
	ISO3 : 'String',
	ISONumeric : 'String',
	Key : 'String',
	Languages : 'String',
	Name : 'String',
	Neighbours : 'String',
	Phone : 'String',
	Population : 'Int64',
	PostalCodeFormat : 'String',
	PostalCodeRegex : 'String',
	TLD : 'String',
	Type : 'String'
};
BWL.ModelMeta.Currency = {
	__cache : 3600,
	__perms : {
		Create : 70,
		Read : 0,
		Update : 70,
		Delete : 100,
		Remove : 70
	},
	DecimalPlaces : 'Int32',
	DecimalSeparator : 'Char',
	HTMLCharacter : 'String',
	ISO : 'String',
	Key : 'String',
	Name : 'String',
	PrefixCharacter : 'Boolean',
	ThousandsSeparator : 'Char',
	ToUSDConversionRate : 'Double',
	Type : 'String',
	UnicodeCharacter : 'String'
};
BWL.ModelMeta.CustomURI = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Key : 'String',
	Type : 'String',
	URI : 'String'
};
BWL.ModelMeta.CustomURIInfo = {
	__cache : 0,
	ItemKey : 'String',
	ItemType : 'String',
	StoreKey : 'String',
	Type : 'String',
	URI : 'String'
};
BWL.ModelMeta.DefaultAdminProviderInfo = {
	__cache : 0,
	ProviderId : 'String',
	ProviderType : 'String',
	Type : 'String'
};
BWL.ModelMeta.DigitalSource = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	BaseURL : 'String',
	Copyright : 'ICopyright',
	Description : 'Text',
	Filename : 'String*(40:40)',
	FileSize : 'Int64',
	Key : 'String',
	MimeInfo : 'MimeInfo*(40:40)',
	Name : 'String',
	SourceFile : 'String*(40:40)',
	Type : 'String'
};
BWL.ModelMeta.DomainProfile = {
	__cache : 0,
	__perms : {
		Create : 0,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	AccessToken : 'IoAuthAccessToken*(10)',
	AccountProfile : 'IAccountProfile',
	Contact : 'IContact',
	DomainProfileId : 'Int64',
	Key : 'String',
	LastLogoff : 'DateTime*(10)',
	LastLogon : 'DateTime*(10)',
	MembershipProfile : 'IMembershipProfile',
	ProfileRole : 'DomainProfileRoleEnum*(10)',
	SocialProfiles : 'List(ISocialProfile)',
	Type : 'String'
};
BWL.ModelMeta.Event = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Categories : 'List(ICategory)',
	ChildEvents : 'List(IEvent)',
	Contacts : 'List(IContact)',
	CustomURI : 'ICustomURI',
	Description : 'Text',
	DisplayOrder : 'Int32',
	EndTime : 'DateTime',
	Items : 'List(IItemInfoBase)',
	Key : 'String',
	LargeImages : 'List(IImage:500:500)',
	MaximumCapacity : 'Int32',
	Name : 'String',
	OnSaleDateTimeEnd : 'DateTime',
	OnSaleDateTimeStart : 'DateTime',
	Places : 'List(IPlace)',
	Public : 'Boolean',
	RankingScore : 'Int32',
	SearchPriority : 'Int32',
	ShowCountdown : 'Boolean',
	SmallImage : 'IImage:150:150',
	StartTime : 'DateTime',
	Type : 'String',
	WebLinks : 'List(IWebLink)'
};
BWL.ModelMeta.Facebook = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Description : 'String',
	FacebookType : 'FacebookTypeEnum',
	Key : 'String',
	Name : 'String',
	ProviderId : 'String',
	Type : 'String'
};
BWL.ModelMeta.Fee = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Amount : 'Double',
	Key : 'String',
	Name : 'String',
	Type : 'String'
};
BWL.ModelMeta.File = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	BaseURL : 'String',
	Copyright : 'ICopyright',
	Description : 'Text',
	Filename : 'String*(40:40)',
	FileSize : 'Int64',
	Key : 'String',
	MimeInfo : 'MimeInfo*(40:40)',
	Name : 'String',
	SourceFile : 'String*(40:40)',
	Type : 'String'
};
BWL.ModelMeta.Flickr = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Description : 'String',
	Key : 'String',
	Name : 'String',
	ProviderId : 'String',
	Type : 'String'
};
BWL.ModelMeta.GeneralAdmissionTicketInventoryItem = {
	__cache : 0,
	__perms : {
		Create : 20,
		Read : 10,
		Update : 10,
		Delete : 100,
		Remove : 30
	},
	CartItemKey : 'String',
	DownloadLink : 'String',
	Info : 'String',
	IsLocked : 'Boolean*(0)',
	IsSold : 'Boolean*(0)',
	ItemInfoKey : 'String',
	ItemInfoPrice : 'Price',
	ItemInfoType : 'String',
	Key : 'String',
	LockExpiryDateTime : 'DateTime',
	LockingDomainProfileKey : 'String*(40:40)',
	ScanDateTime : 'DateTime',
	ScanDeviceKey : 'String',
	SoldDateTime : 'DateTime',
	SoldToDomainProfileKey : 'String*(40:40)',
	Type : 'String',
	UIID : 'Int64*(40)'
};
BWL.ModelMeta.GeneralAdmissionTicketItemInfo = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Categories : 'List(ICategory)',
	CustomURI : 'ICustomURI',
	Description : 'Text',
	DisplayOrder : 'Int32',
	IsTaxable : 'Boolean',
	Items : 'List(IItemInfoBase)',
	Key : 'String',
	LargeImages : 'List(IImage:500:500)',
	MaxPurchaseQuantity : 'Int32',
	Name : 'String',
	NumberTotal : 'Int64',
	OnSaleDateTimeEnd : 'DateTime',
	OnSaleDateTimeStart : 'DateTime',
	Policy : 'Text',
	PreviewImages : 'List(IImage:0:0)',
	Price : 'Price',
	PricingParent : 'IItemInfoBase',
	PricingTiers : 'List(IItemInfoBase)',
	Public : 'Boolean',
	RankingScore : 'Int32',
	SalePrice : 'Price',
	SalePriority : 'Int32',
	SearchPriority : 'Int32',
	ShowCountdown : 'Boolean',
	SmallImage : 'IImage:150:150',
	TaxRules : 'List(ITaxRule)',
	TicketTemplate : 'ITicketTemplate*(40:40)',
	Type : 'String',
	Unlimited : 'Boolean'
};
BWL.ModelMeta.Genre = {
	__cache : 600,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Description : 'Text',
	Key : 'String',
	Name : 'String',
	Type : 'String'
};
BWL.ModelMeta.Image = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	BaseURL : 'String',
	Copyright : 'ICopyright',
	Description : 'Text',
	DPI : 'Int32',
	Filename : 'String*(40:40)',
	FileSize : 'Int64',
	HeightPX : 'Int32',
	ImageFile : 'String',
	Key : 'String',
	MimeInfo : 'MimeInfo*(40:40)',
	Name : 'String',
	SourceFile : 'String*(40:40)',
	ThumbFile : 'String',
	Type : 'String',
	WidthPX : 'Int32'
};
BWL.ModelMeta.ImageCropResize = {
	__cache : 0,
	CropHeight : 'Int32',
	CropWidth : 'Int32',
	CropX : 'Int32',
	CropY : 'Int32',
	ImageHeight : 'Int32',
	ImageWidth : 'Int32',
	RequiredHeight : 'Int32',
	RequiredWidth : 'Int32'
};
BWL.ModelMeta.InitializePayload = {
	__cache : 0,
	ClientApplications : 'List(ClientApplicationInfo)',
	ContainerConfigurations : 'List(ContainerConfiguration)',
	DefaultAdminInfos : 'List(DefaultAdminProviderInfo)',
	Type : 'String'
};
BWL.ModelMeta.InventoryStats = {
	__cache : 0,
	ItemKey : 'String',
	ItemType : 'String',
	NumberAvailable : 'Int64',
	NumberLocked : 'Int64',
	NumberSold : 'Int64',
	NumberTotal : 'Int64',
	Type : 'String'
};
BWL.ModelMeta.ISOName = {
	__cache : 0,
	ISO : 'String',
	Name : 'String'
};
BWL.ModelMeta.KeyName = {
	__cache : 0,
	Key : 'String',
	Name : 'String'
};
BWL.ModelMeta.LastFM = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Description : 'String',
	Key : 'String',
	LastFMType : 'LastFMTypeEnum',
	Name : 'String',
	ProviderId : 'String',
	Type : 'String'
};
BWL.ModelMeta.LinkedIn = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Description : 'String',
	Key : 'String',
	LinkedInType : 'LinkedInTypeEnum',
	Name : 'String',
	ProviderId : 'String',
	Type : 'String'
};
BWL.ModelMeta.MembershipProfile = {
	__cache : 300,
	__perms : {
		Create : 0,
		Read : 0,
		Update : 0,
		Delete : 100,
		Remove : 30
	},
	DomainProfile : 'IDomainProfile',
	Email : 'String',
	FullName : 'String',
	Key : 'String',
	PasswordHash : 'String',
	Type : 'String'
};
BWL.ModelMeta.Message = {
	__cache : 0,
	Body : 'String',
	From : 'String',
	FromName : 'String',
	MessageLevel : 'MessageLevelEnum',
	MessageProvider : 'String',
	MessageType : 'MessageTypeEnum',
	StoreKey : 'String',
	Subject : 'String',
	To : 'String',
	ToName : 'String'
};
BWL.ModelMeta.MimeInfo = {
	__cache : 0,
	Extention : 'String',
	FullMIMEType : 'String',
	MIMESubType : 'String',
	MIMEType : 'String',
	Order : 'Int32',
	Type : 'String'
};
BWL.ModelMeta.MySpace = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Description : 'String',
	Key : 'String',
	Name : 'String',
	ProviderId : 'String',
	Type : 'String'
};
BWL.ModelMeta.oAuthAccessToken = {
	__cache : 0,
	__perms : {
		Create : 0,
		Read : 30,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	ClientIP : 'String',
	ClientKey : 'String',
	DisplayType : 'String',
	Key : 'String',
	ProviderId : 'String',
	ProviderType : 'String',
	SessionKey : 'String',
	State : 'oAuthTokenStateEnum*(10)',
	Type : 'String'
};
BWL.ModelMeta.oAuthInfo = {
	__cache : 0,
	AuthURL : 'String',
	SessionKey : 'String',
	Type : 'String'
};
BWL.ModelMeta.oAuthSession = {
	__cache : 0,
	__perms : {
		Create : 0,
		Read : 0,
		Update : 0,
		Delete : 0,
		Remove : 0
	},
	ClientIP : 'String',
	ClientKey : 'String',
	DisplayType : 'String',
	Key : 'String',
	ProviderAccessSecret : 'String',
	ProviderAccessToken : 'String',
	ProviderAccessVerifier : 'String',
	ProviderId : 'String',
	ProviderRequestSecret : 'String',
	ProviderRequestToken : 'String',
	ProviderType : 'String',
	RedirectURL : 'String',
	SessionType : 'oAuthSessionTypeEnum',
	State : 'oAuthSessionStateEnum',
	Type : 'String'
};
BWL.ModelMeta.Order = {
	__cache : 300,
	__perms : {
		Create : 10,
		Read : 30,
		Update : 40,
		Delete : 100,
		Remove : 40
	},
	Contact : 'IContact',
	Currency : 'String',
	DomainProfileKey : 'String',
	Fees : 'Price',
	Fulfilled : 'DateTime',
	InventoryItems : 'List(IInventoryItemBase)',
	Key : 'String',
	OrderId : 'Int64',
	Placed : 'DateTime',
	RequiresShipping : 'Boolean',
	Shipped : 'DateTime',
	Shipping : 'Price',
	ShippingAddress : 'IAddress',
	State : 'OrderStateEnum',
	StoreKey : 'String',
	SubTotal : 'Price',
	Taxes : 'Price',
	Total : 'Price',
	Transactions : 'List(ITransaction)',
	Type : 'String'
};
BWL.ModelMeta.PaymentInfo = {
	__cache : 0,
	SessionKey : 'String',
	StartPaymentURL : 'String',
	StoreKey : 'String',
	Type : 'String'
};
BWL.ModelMeta.PaymentProvider = {
	__cache : 300,
	__perms : {
		Create : 10,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Currency : 'String',
	Key : 'String',
	Policy : 'Text',
	ProviderId : 'String*(40:40)',
	ProviderToken : 'String*(40:40)',
	ProviderType : 'String',
	Type : 'String'
};
BWL.ModelMeta.PaymentProviderInfo = {
	__cache : 0,
	CurrencyList : 'List(String)',
	ProviderIdText : 'String',
	ProviderName : 'String',
	ProviderTokenText : 'String',
	ProviderType : 'String',
	RequiresProviderId : 'Boolean',
	RequiresProviderToken : 'Boolean',
	Type : 'String'
};
BWL.ModelMeta.PaymentSession = {
	__cache : 0,
	__perms : {
		Create : 10,
		Read : 30,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Amount : 'Price',
	AuthToken : 'String',
	CartKey : 'String',
	ClientIP : 'String',
	DisplayType : 'String',
	Key : 'String',
	Message : 'String',
	PaymentSessionId : 'Int64',
	ProfileKey : 'String',
	ProviderReceipt : 'String',
	ProviderType : 'String',
	RedirectURL : 'String',
	State : 'PaymentSessionStateEnum',
	StoreKey : 'String',
	Type : 'String'
};
BWL.ModelMeta.Place = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Address : 'IAddress',
	Contacts : 'List(IContact)',
	CustomURI : 'ICustomURI',
	Description : 'Text',
	DisplayOrder : 'Int32',
	Key : 'String',
	LargeImages : 'List(IImage:500:500)',
	Name : 'String',
	Public : 'Boolean',
	RankingScore : 'Int32',
	SearchPriority : 'Int32',
	SmallImage : 'IImage:150:150',
	Type : 'String'
};
BWL.ModelMeta.PostalCode = {
	__cache : 3600,
	__perms : {
		Create : 70,
		Read : 0,
		Update : 70,
		Delete : 100,
		Remove : 70
	},
	CityName : 'String',
	Code : 'String',
	CountryISO : 'String',
	County : 'String',
	District : 'String',
	Key : 'String',
	Latitude : 'Double',
	Longitude : 'Double',
	Region : 'IRegion',
	RegionISO : 'String',
	Type : 'String'
};
BWL.ModelMeta.Price = {
	__cache : 0,
	Currency : 'String',
	ItemPrice : 'Double',
	Type : 'String'
};
BWL.ModelMeta.QueuedMessage = {
	__cache : 0,
	Body : 'String',
	From : 'String',
	FromName : 'String',
	MessageLevel : 'MessageLevelEnum',
	MessageProvider : 'String',
	MessageType : 'MessageTypeEnum',
	NextRetryDateTime : 'DateTime',
	RetryCount : 'Int32',
	StoreKey : 'String',
	Subject : 'String',
	To : 'String',
	ToName : 'String'
};
BWL.ModelMeta.Region = {
	__cache : 3600,
	__perms : {
		Create : 70,
		Read : 0,
		Update : 70,
		Delete : 100,
		Remove : 70
	},
	Code : 'String',
	Country : 'ICountry',
	CountryISO : 'String',
	geonameId : 'String',
	ISO : 'String',
	Key : 'String',
	Name : 'String',
	Type : 'String'
};
BWL.ModelMeta.RegionSet = {
	__cache : 3600,
	__perms : {
		Create : 70,
		Read : 0,
		Update : 70,
		Delete : 100,
		Remove : 70
	},
	Key : 'String',
	Name : 'String',
	Regions : 'List(IRegion)',
	Type : 'String'
};
BWL.ModelMeta.ScanDevice = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Active : 'Boolean',
	Description : 'String',
	DeviceInfo : 'ScanDeviceInfo*(40:40)',
	Events : 'List(IEvent)*(40:40)',
	Key : 'String',
	LastSyncDateTime : 'DateTime',
	Name : 'String',
	Type : 'String'
};
BWL.ModelMeta.ScanDeviceInfo = {
	__cache : 0,
	Hardware : 'String',
	Name : 'String',
	OS : 'String',
	Type : 'String',
	UniqueID : 'String*(40:40)',
	Version : 'String'
};
BWL.ModelMeta.ScanEventInfo = {
	__cache : 0,
	__perms : {
		Create : 30,
		Read : 30,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	EventDateTime : 'DateTime',
	Key : 'String',
	Name : 'String',
	PlaceName : 'String',
	Type : 'String'
};
BWL.ModelMeta.ScanTicket = {
	__cache : 0,
	__perms : {
		Create : 30,
		Read : 30,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Info : 'String',
	Key : 'String',
	ScanDateTime : 'DateTime',
	ScanDeviceKey : 'String',
	SyncDateModified : 'DateTime',
	TicketInfoKey : 'String',
	Type : 'String',
	Valid : 'Boolean',
	ValidationHash : 'String'
};
BWL.ModelMeta.ScanTicketInfo = {
	__cache : 0,
	__perms : {
		Create : 30,
		Read : 30,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Key : 'String',
	Name : 'String',
	Type : 'String'
};
BWL.ModelMeta.SearchIndex = {
	__cache : 300,
	__perms : {
		Create : 90,
		Read : 0,
		Update : 90,
		Delete : 90,
		Remove : 90
	},
	Categories : 'String',
	Description : 'String',
	IsSalePrice : 'Boolean',
	ItemDateModified : 'DateTime',
	ItemKey : 'String',
	ItemType : 'String',
	Key : 'String',
	Locations : 'String',
	Name : 'String',
	Price : 'Price',
	SearchPriority : 'Int32',
	SearchTags : 'String',
	SearchText : 'String',
	StoreKey : 'String',
	Type : 'String',
	URI : 'String'
};
BWL.ModelMeta.ServiceInvoice = {
	__cache : 0,
	__perms : {
		Create : 70,
		Read : 20,
		Update : 70,
		Delete : 100,
		Remove : 70
	},
	Amount : 'Price',
	InvoiceCreated : 'DateTime',
	InvoiceDue : 'DateTime',
	InvoicePaid : 'DateTime',
	Key : 'String',
	ServiceInvoiceId : 'Int64',
	ServiceInvoiceItems : 'List(IServiceInvoiceItem)',
	State : 'ServiceInvoiceStateEnum',
	StoreKey : 'String',
	Type : 'String'
};
BWL.ModelMeta.ServiceInvoiceItem = {
	__cache : 0,
	__perms : {
		Create : 0,
		Read : 20,
		Update : 70,
		Delete : 100,
		Remove : 70
	},
	Amount : 'Price',
	BandwidthUsed : 'Int64',
	DomainProfileKey : 'String',
	Key : 'String',
	OrderKey : 'String',
	OrderPlaced : 'DateTime',
	OrderValue : 'Price',
	State : 'ServiceInvoiceItemStateEnum',
	StoreKey : 'String',
	Type : 'String'
};
BWL.ModelMeta.SocialProfile = {
	__cache : 300,
	__perms : {
		Create : 0,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	EmailAddress : 'String',
	FullName : 'String',
	Key : 'String',
	ProviderAccessSecret : 'String',
	ProviderAccessToken : 'String',
	ProviderId : 'String',
	ProviderType : 'String',
	PublicImageURL : 'String',
	PublicProfileURL : 'String',
	Type : 'String'
};
BWL.ModelMeta.Store = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Address : 'IAddress',
	Categories : 'List(ICategory)',
	Contacts : 'List(IContact)',
	Currency : 'String',
	Description : 'Text',
	Events : 'List(IEvent)',
	ExternalInfos : 'List(IExternalInfoBase)',
	HasMemberships : 'Boolean',
	HasWishlist : 'Boolean',
	IsOwner : 'Boolean*(0)',
	Items : 'List(IItemInfoBase)',
	Key : 'String',
	LargeBannerImages : 'List(IImage:1024:150)',
	LargeImages : 'List(IImage:500:500)',
	Name : 'String',
	PaymentProviders : 'List(IPaymentProvider)',
	Public : 'Boolean',
	SearchPriority : 'Int32',
	SmallBannerImage : 'IImage:520:150',
	SmallImage : 'IImage:150:150',
	StoreURIs : 'List(IStoreURI)',
	TaxRules : 'List(ITaxRule)',
	Type : 'String',
	WebLinks : 'List(IWebLink)'
};
BWL.ModelMeta.StoreConfiguration = {
	__cache : 0,
	ConfigurationKey : 'String',
	Key : 'String',
	StoreKey : 'String',
	Type : 'String',
	Value : 'String'
};
BWL.ModelMeta.StorePreRegister = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	AddressLine1 : 'String',
	AddressLine2 : 'String',
	City : 'String',
	ContactName : 'String',
	Country : 'String',
	County : 'String',
	District : 'String',
	EmailAddress : 'String',
	Facebook : 'String',
	Key : 'String',
	Latitude : 'Double',
	LinkedIn : 'String',
	Longitude : 'Double',
	Name : 'String',
	Phone : 'String',
	PostalCode : 'String',
	Region : 'String',
	StoreKey : 'String',
	StoreURI : 'String',
	Timezone : 'String',
	Twitter : 'String',
	Type : 'String',
	WebAddress : 'String'
};
BWL.ModelMeta.StoreURI = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Key : 'String',
	Type : 'String',
	URI : 'String'
};
BWL.ModelMeta.Tax = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Code : 'String',
	IsTaxonTax : 'Boolean',
	Key : 'String',
	Name : 'String',
	Number : 'String',
	Percent : 'Double',
	Type : 'String'
};
BWL.ModelMeta.TaxRule = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	CityKey : 'String',
	CountryKey : 'String',
	Key : 'String',
	RegionKey : 'String',
	Taxes : 'List(ITax)',
	Type : 'String'
};
BWL.ModelMeta.TicketTemplate = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 20,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	BackgroundColorHex : 'String',
	CustomTemplateImage : 'IImage:1200:375*(40:40)',
	FontColorHex : 'String',
	FontType : 'String',
	Horizontal : 'Boolean',
	IncludeDetails : 'Boolean',
	IncludeQRCode : 'Boolean',
	IncludeSeatInfo : 'Boolean',
	IncludeTerms : 'Boolean',
	IncludeTicketImage : 'Boolean',
	IncludeTicketName : 'Boolean',
	Key : 'String',
	Template : 'String',
	Type : 'String'
};
BWL.ModelMeta.Timezone = {
	__cache : 3600,
	__perms : {
		Create : 70,
		Read : 0,
		Update : 70,
		Delete : 100,
		Remove : 70
	},
	CountryISO : 'String',
	DSTOffset : 'Double',
	GMTOffset : 'Double',
	Key : 'String',
	Name : 'String',
	RawOffset : 'Double',
	Type : 'String'
};
BWL.ModelMeta.Transaction = {
	__cache : 300,
	__perms : {
		Create : 10,
		Read : 30,
		Update : 40,
		Delete : 100,
		Remove : 40
	},
	Amount : 'Price',
	Key : 'String',
	Message : 'String',
	ProviderReceipt : 'String',
	ProviderType : 'String',
	State : 'TransactionStateEnum',
	TransactionId : 'Int64',
	Type : 'String'
};
BWL.ModelMeta.Twitter = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Description : 'String',
	Key : 'String',
	Name : 'String',
	ProviderId : 'String',
	Type : 'String'
};
BWL.ModelMeta.WebLink = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Description : 'Text',
	Key : 'String',
	Name : 'String',
	Type : 'String',
	URL : 'String'
};
BWL.ModelMeta.Wishlist = {
	__cache : 0,
	__perms : {
		Create : 10,
		Read : 30,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Items : 'List(IDomainObject)',
	Key : 'String',
	ProfileKey : 'String',
	Type : 'String'
};
BWL.ModelMeta.YouTube = {
	__cache : 300,
	__perms : {
		Create : 20,
		Read : 0,
		Update : 30,
		Delete : 100,
		Remove : 30
	},
	Description : 'String',
	Key : 'String',
	Name : 'String',
	ProviderId : 'String',
	Type : 'String'
};
