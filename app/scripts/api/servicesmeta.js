BWL.ServicesMeta.SearchIndexService = {
	SearchAsync : {
		__perms : 0,
		searchString : 'String',
		orderBy : 'String',
		page : 'String'
	},
	SearchTagsAsync : {
		__perms : 0,
		searchString : 'String',
		orderBy : 'String',
		page : 'String'
	},
	SearchStoreAsync : {
		__perms : 0,
		storeKey : 'String',
		searchString : 'String',
		orderBy : 'String',
		page : 'String'
	},
	SearchStoreTagsAsync : {
		__perms : 0,
		storeKey : 'String',
		searchString : 'String',
		orderBy : 'String',
		page : 'String'
	}
};
BWL.ServicesMeta.WishlistService = {
	GetWishlistAsync : {
		__perms : 10,
		storeKey : 'String'
	},
	ClearWishlistAsync : {
		__perms : 10,
		storeKey : 'String'
	},
	AddWishlistItemAsync : {
		__perms : 10,
		storeKey : 'String',
		itemTypeName : 'String',
		itemKey : 'String'
	},
	RemoveWishlistItemAsync : {
		__perms : 10,
		storeKey : 'String',
		itemTypeName : 'String',
		itemKey : 'String'
	}
};
BWL.ServicesMeta.DownloadService = {
	DownloadFileAsync : {
		__perms : 20,
		storeKey : 'String',
		itemType : 'String',
		itemKey : 'String'
	},
	DownloadTicketAsync : {
		__perms : 10,
		storeKey : 'String',
		inventoryType : 'String',
		inventoryKey : 'String'
	},
	DownloadTicketsAsync : {
		__perms : 10,
		storeKey : 'String',
		inventoryType : 'String',
		inventoryKeys : 'String'
	},
	DownloadQRCodeAsync : {
		__perms : 10,
		storeKey : 'String',
		inventoryType : 'String',
		inventoryKey : 'String'
	}
};
BWL.ServicesMeta.MessageService = {
	GetMessagesProvidersAsync : {
		__perms : 10
	},
	SendMessageAsync : {
		__perms : 10,
		storeKey : 'String',
		messagesProvider : 'String',
		objMessage : 'Stream'
	},
	SendStoreAdminMessageAsync : {
		__perms : 10,
		storeKey : 'String',
		objMessage : 'Stream'
	},
	SendAdminMessageAsync : {
		__perms : 10,
		storeKey : 'String',
		objMessage : 'Stream'
	}
};
BWL.ServicesMeta.OrderService = {
	ProcessOrderAsync : {
		__perms : 10,
		storeKey : 'String'
	},
	SetOrderStateAsync : {
		__perms : 20,
		storeKey : 'String',
		orderKey : 'String',
		orderState : 'String'
	},
	FindOrdersAsync : {
		__perms : 20,
		storeKey : 'String',
		orderState : 'String',
		startDate : 'String',
		endDate : 'String'
	},
	FindOrderHistoryAsync : {
		__perms : 10,
		storeKey : 'String'
	},
	FindAllOrderHistoryAsync : {
		__perms : 10
	}
};
BWL.ServicesMeta.PaymentService = {
	ListProvidersByCurrencyAsync : {
		__perms : 10,
		currency : 'String'
	},
	FindProviderInfoByTypeAsync : {
		__perms : 10,
		providerType : 'String'
	},
	ListPaymentProvidersAsync : {
		__perms : 10,
		storeKey : 'String'
	},
	BeginPaymentAsync : {
		__perms : 10,
		storeKey : 'String',
		providerType : 'String',
		display : 'String',
		redirectURL : 'String'
	},
	GetSessionStateAsync : {
		__perms : 10,
		key : 'String'
	},
	CancelPaymentAsync : {
		__perms : 10,
		key : 'String'
	}
};
BWL.ServicesMeta.ModelService = {
	CreateAsync : {
		__perms : 10,
		storeKey : 'String',
		type : 'String',
		obj : 'Stream'
	},
	ReadAsync : {
		__perms : 0,
		storeKey : 'String',
		type : 'String',
		key : 'String',
		levels : 'String'
	},
	UpdateAsync : {
		__perms : 10,
		storeKey : 'String',
		type : 'String',
		key : 'String',
		obj : 'Stream'
	},
	DeleteAsync : {
		__perms : 10,
		storeKey : 'String',
		type : 'String',
		key : 'String'
	},
	AddAsync : {
		__perms : 10,
		storeKey : 'String',
		type : 'String',
		key : 'String',
		property : 'String',
		addType : 'String',
		addObject : 'Stream'
	},
	GetAsync : {
		__perms : 0,
		storeKey : 'String',
		type : 'String',
		key : 'String',
		property : 'String',
		levels : 'String'
	},
	RemoveAsync : {
		__perms : 10,
		storeKey : 'String',
		type : 'String',
		key : 'String',
		property : 'String',
		removeType : 'String',
		removeKey : 'String'
	},
	ListAsync : {
		__perms : 10,
		storeKey : 'String',
		type : 'String',
		page : 'String'
	},
	FindAsync : {
		__perms : 10,
		storeKey : 'String',
		type : 'String',
		page : 'String',
		obj : 'Stream'
	},
	ImportFromPOSTAsync : {
		__perms : 100,
		storeKey : 'String',
		type : 'String',
		obj : 'Stream'
	},
	ImportFromURLAsync : {
		__perms : 100,
		storeKey : 'String',
		type : 'String',
		url : 'String'
	}
};
BWL.ServicesMeta.MediaLibraryService = {
	CropResizeImageAsync : {
		__perms : 20,
		storeKey : 'String',
		key : 'String',
		objImageCropResize : 'Stream'
	},
	ListImagesAsync : {
		__perms : 20,
		storeKey : 'String'
	},
	DeleteImageAsync : {
		__perms : 20,
		storeKey : 'String',
		key : 'String'
	},
	ListFilesAsync : {
		__perms : 20,
		storeKey : 'String'
	},
	DeleteFileAsync : {
		__perms : 20,
		storeKey : 'String',
		key : 'String'
	}
};
BWL.ServicesMeta.oAuthService = {
	ListAuthProvidersAsync : {
		__perms : 0
	},
	BeginAuthAsync : {
		__perms : 0,
		providerName : 'String',
		clientKey : 'String',
		display : 'String',
		redirectURL : 'String'
	},
	GetSessionStateAsync : {
		__perms : 0,
		sessionKey : 'String'
	},
	GetTokenStateAsync : {
		__perms : 10
	},
	GetTokenAsync : {
		__perms : 0,
		sessionKey : 'String',
		clientKey : 'String',
		clientSecret : 'String'
	},
	CancelAuthAsync : {
		__perms : 0,
		sessionKey : 'String'
	},
	LogonAsync : {
		__perms : 0,
		providerName : 'String',
		clientKey : 'String',
		display : 'String',
		redirectURL : 'String'
	},
	LogoffAsync : {
		__perms : 10
	},
	AddLogonAsync : {
		__perms : 10,
		providerName : 'String',
		clientKey : 'String',
		display : 'String',
		redirectURL : 'String'
	},
	RemoveLogonAsync : {
		__perms : 10,
		socialProfileKey : 'String'
	}
};
BWL.ServicesMeta.ScannerService = {
	ListDevicesAsync : {
		__perms : 20,
		storeKey : 'String',
		levels : 'String'
	},
	RegisterDeviceAsync : {
		__perms : 0,
		storeKey : 'String',
		deviceKey : 'String',
		objDeviceInfo : 'Stream'
	},
	GetConfigAsync : {
		__perms : 20,
		storeKey : 'String',
		deviceKey : 'String'
	},
	ListEventInfoAsync : {
		__perms : 0,
		storeKey : 'String',
		deviceKey : 'String',
		uniqueId : 'String'
	},
	SyncGetTicketsAsync : {
		__perms : 0,
		storeKey : 'String',
		deviceKey : 'String',
		eventKey : 'String',
		uniqueId : 'String',
		hash : 'String',
		sinceDateTime : 'String'
	},
	SyncUpdateTicketsAsync : {
		__perms : 0,
		storeKey : 'String',
		deviceKey : 'String',
		eventKey : 'String',
		uniqueId : 'String',
		objTickets : 'Stream'
	},
	SyncInitialTicketsAsync : {
		__perms : 0,
		storeKey : 'String',
		deviceKey : 'String',
		eventKey : 'String',
		uniqueId : 'String',
		hash : 'String',
		compression : 'String'
	}
};
BWL.ServicesMeta.MembershipService = {
	RegisterAsync : {
		__perms : 0,
		storeKey : 'String',
		objMembership : 'Stream'
	},
	LogonAsync : {
		__perms : 0,
		storeKey : 'String',
		objMembership : 'Stream'
	},
	LogoffAsync : {
		__perms : 10,
		storeKey : 'String'
	},
	ChangePasswordAsync : {
		__perms : 10,
		storeKey : 'String',
		newPasswordHash : 'String',
		objMembership : 'Stream'
	},
	ResetPasswordAsync : {
		__perms : 0,
		storeKey : 'String',
		objMembership : 'Stream'
	},
	ApproveResetPasswordAsync : {
		__perms : 0,
		storeKey : 'String',
		email : 'String',
		approveToken : 'String'
	}
};
BWL.ServicesMeta.SystemProfileService = {
	GetProfileAsync : {
		__perms : 0,
		levels : 'String'
	},
	SignupAsync : {
		__perms : 0
	},
	RegisterAsync : {
		__perms : 0,
		requestedRole : 'String',
		objAccount : 'Stream'
	},
	ApproveRegisterAsync : {
		__perms : 0,
		email : 'String',
		approveToken : 'String'
	},
	VerifyEmailAsync : {
		__perms : 0,
		email : 'String',
		approveToken : 'String'
	},
	LogonAsync : {
		__perms : 0,
		objAccount : 'Stream'
	},
	LogoffAsync : {
		__perms : 10
	},
	ChangePasswordAsync : {
		__perms : 10,
		newPasswordHash : 'String',
		objAccount : 'Stream'
	},
	ResetPasswordAsync : {
		__perms : 0,
		objAccount : 'Stream'
	},
	ApproveResetPasswordAsync : {
		__perms : 0,
		email : 'String',
		approveToken : 'String'
	},
	AccessRequestAsync : {
		__perms : 10,
		type : 'String',
		key : 'String',
		requestedAccess : 'String'
	},
	AccessRequestForAsync : {
		__perms : 100,
		type : 'String',
		key : 'String',
		profileKey : 'String',
		requestedAccess : 'String'
	},
	AccessAddAsync : {
		__perms : 10,
		type : 'String',
		key : 'String',
		profileKey : 'String',
		access : 'String'
	},
	AccessPendingAsync : {
		__perms : 10
	},
	AccessApproveAsync : {
		__perms : 10,
		key : 'String'
	},
	AccessRejectAsync : {
		__perms : 10,
		key : 'String'
	}
};
BWL.ServicesMeta.CartService = {
	AddItemsAsync : {
		__perms : 10,
		storeKey : 'String',
		itemTypeName : 'String',
		itemKey : 'String',
		quantity : 'String'
	},
	AddAddressAsync : {
		__perms : 10,
		storeKey : 'String',
		addressKey : 'String'
	},
	RemoveItemsAsync : {
		__perms : 10,
		storeKey : 'String',
		itemTypeName : 'String',
		itemKey : 'String',
		quantity : 'String'
	},
	GetCartAsync : {
		__perms : 10,
		storeKey : 'String'
	},
	ClearCartAsync : {
		__perms : 10,
		storeKey : 'String'
	}
};
BWL.ServicesMeta.GeoService = {
	ReadContinentAsync : {
		__perms : 0,
		continentKey : 'String'
	},
	ListContinentsAsync : {
		__perms : 0
	},
	ReadCountryAsync : {
		__perms : 0,
		countryKey : 'String'
	},
	FindCountryByISOAsync : {
		__perms : 0,
		countryISO : 'String'
	},
	ListCountriesAsync : {
		__perms : 0
	},
	ListCountriesByContinentAsync : {
		__perms : 0,
		continentISO : 'String'
	},
	ReadCurrencyAsync : {
		__perms : 0,
		currencyKey : 'String'
	},
	ListCurrenciesAsync : {
		__perms : 0
	},
	ReadRegionAsync : {
		__perms : 0,
		regionKey : 'String'
	},
	FindRegionByISOAsync : {
		__perms : 0,
		countryISO : 'String',
		regionISO : 'String'
	},
	ListRegionsByCountryAsync : {
		__perms : 0,
		countryISO : 'String'
	},
	ReadCityAsync : {
		__perms : 0,
		cityKey : 'String'
	},
	ListCitiesByRegionAsync : {
		__perms : 0,
		countryISO : 'String',
		regionISO : 'String'
	},
	FindCityAsync : {
		__perms : 0,
		name : 'String',
		countryISO : 'String',
		regionISO : 'String'
	},
	FindCitiesAsync : {
		__perms : 0,
		name : 'String',
		countryISO : 'String',
		regionISO : 'String'
	},
	ReadPostalAsync : {
		__perms : 0,
		postalKey : 'String'
	},
	FindPostalCodeAsync : {
		__perms : 0,
		countryISO : 'String',
		code : 'String'
	},
	ReadTimezoneAsync : {
		__perms : 0,
		timezoneKey : 'String'
	},
	ListTimezonesAsync : {
		__perms : 0
	},
	ListTimezonesByCountryISOAsync : {
		__perms : 0,
		countryISO : 'String'
	}
};
BWL.ServicesMeta.StoreAdminService = {
	GetTicketTemplateListAsync : {
		__perms : 20,
		storeKey : 'String'
	},
	GetSystemFontListAsync : {
		__perms : 20,
		storeKey : 'String'
	},
	GetPreviewTicketAsync : {
		__perms : 20,
		storeKey : 'String',
		ticketItemType : 'String',
		ticketItemKey : 'String',
		backgroundColorHex : 'String',
		fontColorHex : 'String',
		fontType : 'String',
		template : 'String',
		customImageKey : 'String',
		includeDetails : 'String',
		includeTerms : 'String',
		includeTicketImage : 'String',
		includeTicketName : 'String',
		horizontal : 'String'
	}
};
BWL.ServicesMeta.InventoryService = {
	AddInventoryItemsAsync : {
		__perms : 20,
		storeKey : 'String',
		type : 'String',
		key : 'String',
		quantity : 'String'
	},
	RemoveInventoryItemsAsync : {
		__perms : 20,
		storeKey : 'String',
		type : 'String',
		key : 'String',
		quantity : 'String'
	},
	GetInventoryStatsAsync : {
		__perms : 0,
		storeKey : 'String',
		type : 'String',
		key : 'String'
	}
};
BWL.ServicesMeta.StoreService = {
	ListStoresAsync : {
		__perms : 20,
		levels : 'String'
	},
	FindStoreKeyFromCustomURIAsync : {
		__perms : 0,
		customURI : 'String'
	},
	FindStoreKeyFromFacebookPageIdAsync : {
		__perms : 0,
		facebookPageId : 'String'
	},
	FindCustomURIInfoFromFullURLAsync : {
		__perms : 0,
		fullURL : 'String'
	},
	FindCustomURIInfoFromURIAsync : {
		__perms : 0,
		storeKey : 'String',
		URI : 'String'
	}
};
BWL.ServicesMeta.RootService = {
	GetJavaScriptProxiesAsync : {
		__perms : 0
	},
	GetJavaScriptProxiesMetaAsync : {
		__perms : 0
	},
	GetJavaScriptModelAsync : {
		__perms : 0
	},
	GetJavaScriptModelMetaAsync : {
		__perms : 0
	},
	GetJavaScriptModelEnumAsync : {
		__perms : 0
	},
	GetJavaScriptModelEmberAsync : {
		__perms : 0
	},
	GetServerVersionAsync : {
		__perms : 0
	},
	InitializeAsync : {
		__perms : 0,
		objInitializePayload : 'Stream'
	},
	InitializeInfoAsync : {
		__perms : 0
	},
	InitializeGEOAsync : {
		__perms : 0
	}
};
BWL.ServicesMeta.UploadService = {
	UploadImageAsync : {
		__perms : 20,
		storeKey : 'String',
		uploadStream : 'Stream'
	},
	UploadFileAsync : {
		__perms : 20,
		storeKey : 'String',
		uploadStream : 'Stream'
	}
};
