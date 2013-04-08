BWL.Services.CartService = {
  AddItemsAsync : function(storeKey, itemTypeName, itemKey, quantity,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/cart.svc/{0}/{1}/{2}/{3}'.format(storeKey,
        itemTypeName, itemKey, quantity);
    BWL.InvokeService('PUT', uri, null, successCallback, errorCallback);
  },
  AddAddressAsync : function(storeKey, addressKey, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/cart.svc/{0}/{1}'.format(storeKey, addressKey);
    BWL.InvokeService('PUT', uri, null, successCallback, errorCallback);
  },
  RemoveItemsAsync : function(storeKey, itemTypeName, itemKey, quantity,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/cart.svc/{0}/{1}/{2}/{3}'.format(storeKey,
        itemTypeName, itemKey, quantity);
    BWL.InvokeService('DELETE', uri, null, successCallback, errorCallback);
  },
  GetCartAsync : function(storeKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/cart.svc/{0}'.format(storeKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  ClearCartAsync : function(storeKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/cart.svc/{0}'.format(storeKey);
    BWL.InvokeService('DELETE', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.DownloadService = {
  DownloadFileAsync : function(storeKey, itemType, itemKey, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/download.svc/{0}/file/{1}/{2}'.format(storeKey,
        itemType, itemKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  DownloadTicketAsync : function(storeKey, inventoryType, inventoryKey,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/download.svc/{0}/ticket/{1}/{2}'.format(
        storeKey, inventoryType, inventoryKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  DownloadTicketsAsync : function(storeKey, inventoryType, inventoryKeys,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/download.svc/{0}/tickets/{1}/{2}'.format(
        storeKey, inventoryType, inventoryKeys);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  DownloadQRCodeAsync : function(storeKey, inventoryType, inventoryKey,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/download.svc/{0}/qrcode/{1}/{2}'.format(
        storeKey, inventoryType, inventoryKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.InventoryService = {
  AddInventoryItemsAsync : function(storeKey, type, key, quantity,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/inventory.svc/{0}/{1}/{2}/{3}'.format(storeKey,
        type, key, quantity);
    BWL.InvokeService('PUT', uri, null, successCallback, errorCallback);
  },
  RemoveInventoryItemsAsync : function(storeKey, type, key, quantity,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/inventory.svc/{0}/{1}/{2}/{3}'.format(storeKey,
        type, key, quantity);
    BWL.InvokeService('DELETE', uri, null, successCallback, errorCallback);
  },
  GetInventoryStatsAsync : function(storeKey, type, key, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/inventory.svc/{0}/{1}/{2}'.format(storeKey,
        type, key);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.MediaLibraryService = {
  CropResizeImageAsync : function(storeKey, key, objImageCropResize,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/medialibrary.svc/{0}/image/crop/{1}'.format(
        storeKey, key, objImageCropResize);
    BWL.InvokeService('POST', uri, objImageCropResize, successCallback,
        errorCallback);
  },
  ListImagesAsync : function(storeKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/medialibrary.svc/{0}/images'.format(storeKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  DeleteImageAsync : function(storeKey, key, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/medialibrary.svc/{0}/image/{1}'.format(
        storeKey, key);
    BWL.InvokeService('DELETE', uri, null, successCallback, errorCallback);
  },
  ListFilesAsync : function(storeKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/medialibrary.svc/{0}/files'.format(storeKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  DeleteFileAsync : function(storeKey, key, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/medialibrary.svc/{0}/file/{1}'.format(storeKey,
        key);
    BWL.InvokeService('DELETE', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.MembershipService = {
  RegisterAsync : function(storeKey, objMembership, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/membership.svc/{0}/register'.format(storeKey,
        objMembership);
    BWL.InvokeService('POST', uri, objMembership, successCallback,
        errorCallback);
  },
  LogonAsync : function(storeKey, objMembership, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/membership.svc/{0}/logon'.format(storeKey,
        objMembership);
    BWL.InvokeService('POST', uri, objMembership, successCallback,
        errorCallback);
  },
  LogoffAsync : function(storeKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/membership.svc/{0}/logoff'.format(storeKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  ChangePasswordAsync : function(storeKey, newPasswordHash, objMembership,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/membership.svc/{0}/changepass/{1}'.format(
        storeKey, newPasswordHash, objMembership);
    BWL.InvokeService('POST', uri, objMembership, successCallback,
        errorCallback);
  },
  ResetPasswordAsync : function(storeKey, objMembership, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/membership.svc/{0}/resetpass'.format(storeKey,
        objMembership);
    BWL.InvokeService('POST', uri, objMembership, successCallback,
        errorCallback);
  },
  ApproveResetPasswordAsync : function(storeKey, email, approveToken,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/membership.svc/{0}/resetpass/{2}?email={1}'
        .format(storeKey, email, approveToken);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.MessageService = {
  GetMessagesProvidersAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/message.svc/providers', null,
        successCallback, errorCallback);
  },
  SendMessageAsync : function(storeKey, messagesProvider, objMessage,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/message.svc/{0}/{1}'.format(storeKey,
        messagesProvider, objMessage);
    BWL.InvokeService('POST', uri, objMessage, successCallback, errorCallback);
  },
  SendStoreAdminMessageAsync : function(storeKey, objMessage, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/message.svc/{0}/storeadmin'.format(storeKey,
        objMessage);
    BWL.InvokeService('POST', uri, objMessage, successCallback, errorCallback);
  },
  SendAdminMessageAsync : function(storeKey, objMessage, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/message.svc/{0}/admin'.format(storeKey,
        objMessage);
    BWL.InvokeService('POST', uri, objMessage, successCallback, errorCallback);
  }
};
BWL.Services.ModelService = {
  CreateAsync : function(storeKey, type, obj, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/model.svc/{0}/{1}'.format(storeKey, type, obj);
    BWL.InvokeService('POST', uri, obj, successCallback, errorCallback);
  },
  ReadAsync : function(storeKey, type, key, levels, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/model.svc/{0}/{1}/{2}/{3}'.format(storeKey,
        type, key, levels);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  UpdateAsync : function(storeKey, type, key, obj, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/model.svc/{0}/{1}/{2}'.format(storeKey, type,
        key, obj);
    BWL.InvokeService('PUT', uri, obj, successCallback, errorCallback);
  },
  DeleteAsync : function(storeKey, type, key, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/model.svc/{0}/{1}/{2}'.format(storeKey, type,
        key);
    BWL.InvokeService('DELETE', uri, null, successCallback, errorCallback);
  },
  AddAsync : function(storeKey, type, key, property, addType, addObject,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/model.svc/{0}/{1}/{2}/{3}/{4}'.format(storeKey,
        type, key, property, addType, addObject);
    BWL.InvokeService('PUT', uri, addObject, successCallback, errorCallback);
  },
  GetAsync : function(storeKey, type, key, property, levels, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/model.svc/{0}/{1}/{2}/{3}/{4}'.format(storeKey,
        type, key, property, levels);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  RemoveAsync : function(storeKey, type, key, property, removeType, removeKey,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/model.svc/{0}/{1}/{2}/{3}/{4}/{5}'.format(
        storeKey, type, key, property, removeType, removeKey);
    BWL.InvokeService('DELETE', uri, null, successCallback, errorCallback);
  },
  ListAsync : function(storeKey, type, page, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/model.svc/{0}/{1}?p={2}'.format(storeKey, type,
        page);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  FindAsync : function(storeKey, type, page, obj, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/model.svc/{0}/find/{1}?p={2}'.format(storeKey,
        type, page, obj);
    BWL.InvokeService('POST', uri, obj, successCallback, errorCallback);
  },
  ImportFromPOSTAsync : function(storeKey, type, obj, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/model.svc/{0}/import/{1}'.format(storeKey,
        type, obj);
    BWL.InvokeService('POST', uri, obj, successCallback, errorCallback);
  },
  ImportFromURLAsync : function(storeKey, type, url, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/model.svc/{0}/import/{1}?url={2}'.format(
        storeKey, type, url);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.oAuthService = {
  ListAuthProvidersAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/oauth.svc/providers', null,
        successCallback, errorCallback);
  },
  BeginAuthAsync : function(providerName, clientKey, display, redirectURL,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/oauth.svc/authorize?providerName={0}&clientKey={1}&display={2}&redirectURL={3}'
        .format(providerName, clientKey, display, redirectURL);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  GetSessionStateAsync : function(sessionKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/oauth.svc/sessionState/{0}'.format(sessionKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  GetTokenStateAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/oauth.svc/tokenState', null,
        successCallback, errorCallback);
  },
  GetTokenAsync : function(sessionKey, clientKey, clientSecret,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/oauth.svc/getToken?sessionKey={0}&clientKey={1}&clientSecret={2}'
        .format(sessionKey, clientKey, clientSecret);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  CancelAuthAsync : function(sessionKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/oauth.svc/cancel?sessionKey={0}'
        .format(sessionKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  LogonAsync : function(providerName, clientKey, display, redirectURL,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/oauth.svc/logon?providerName={0}&clientKey={1}&display={2}&redirectURL={3}'
        .format(providerName, clientKey, display, redirectURL);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  LogoffAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/oauth.svc/logoff', null,
        successCallback, errorCallback);
  },
  AddLogonAsync : function(providerName, clientKey, display, redirectURL,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/oauth.svc/addLogon?providerName={0}&clientKey={1}&display={2}&redirectURL={3}'
        .format(providerName, clientKey, display, redirectURL);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  RemoveLogonAsync : function(socialProfileKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/oauth.svc/removeLogon/{0}'
        .format(socialProfileKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.OrderService = {
  ProcessOrderAsync : function(storeKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/order.svc/{0}/process'.format(storeKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  SetOrderStateAsync : function(storeKey, orderKey, orderState,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/order.svc/{0}/{1}/{2}'.format(storeKey,
        orderKey, orderState);
    BWL.InvokeService('PUT', uri, null, successCallback, errorCallback);
  },
  FindOrdersAsync : function(storeKey, orderState, startDate, endDate,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/order.svc/{0}/{1}?startdate={2}&enddate={3}'
        .format(storeKey, orderState, startDate, endDate);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  FindOrderHistoryAsync : function(storeKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/order.svc/{0}/history'.format(storeKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  FindAllOrderHistoryAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/order.svc/history', null,
        successCallback, errorCallback);
  }
};
BWL.Services.PaymentService = {
  ListProvidersByCurrencyAsync : function(currency, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/payment.svc/providers/{0}'.format(currency);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  FindProviderInfoByTypeAsync : function(providerType, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/payment.svc/provider/{0}'.format(providerType);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  ListPaymentProvidersAsync : function(storeKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/payment.svc/storeproviders/{0}'
        .format(storeKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  BeginPaymentAsync : function(storeKey, providerType, display, redirectURL,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/payment.svc/begin/{0}/{1}?display={2}&redirectURL={3}'
        .format(storeKey, providerType, display, redirectURL);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  GetSessionStateAsync : function(key, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/payment.svc/state/{0}'.format(key);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  CancelPaymentAsync : function(key, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/payment.svc/cancel/{0}'.format(key);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.RootService = {
  GetJavaScriptProxiesAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/root.svc/services.js', null,
        successCallback, errorCallback);
  },
  GetJavaScriptProxiesMetaAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/root.svc/servicesmeta.js', null,
        successCallback, errorCallback);
  },
  GetJavaScriptModelAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/root.svc/models.js', null,
        successCallback, errorCallback);
  },
  GetJavaScriptModelMetaAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/root.svc/modelsmeta.js', null,
        successCallback, errorCallback);
  },
  GetJavaScriptModelEnumAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/root.svc/modelsenum.js', null,
        successCallback, errorCallback);
  },
  GetJavaScriptModelEmberAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/root.svc/modelember.js', null,
        successCallback, errorCallback);
  },
  GetServerVersionAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/root.svc/version', null,
        successCallback, errorCallback);
  },
  InitializeAsync : function(objInitializePayload, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/root.svc/initialize'
        .format(objInitializePayload);
    BWL.InvokeService('POST', uri, objInitializePayload, successCallback,
        errorCallback);
  },
  InitializeInfoAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/root.svc/initializeinfo', null,
        successCallback, errorCallback);
  },
  InitializeGEOAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/root.svc/initializegeo', null,
        successCallback, errorCallback);
  }
};
BWL.Services.ScannerService = {
  ListDevicesAsync : function(storeKey, levels, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/scanner.svc/{0}/{1}'.format(storeKey, levels);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  RegisterDeviceAsync : function(storeKey, deviceKey, objDeviceInfo,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/scanner.svc/{0}/register/{1}'.format(storeKey,
        deviceKey, objDeviceInfo);
    BWL
        .InvokeService('PUT', uri, objDeviceInfo, successCallback,
            errorCallback);
  },
  GetConfigAsync : function(storeKey, deviceKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/scanner.svc/{0}/config/{1}'.format(storeKey,
        deviceKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  ListEventInfoAsync : function(storeKey, deviceKey, uniqueId, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/scanner.svc/{0}/events/{1}/{2}'.format(
        storeKey, deviceKey, uniqueId);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  SyncGetTicketsAsync : function(storeKey, deviceKey, eventKey, uniqueId, hash,
      sinceDateTime, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/scanner.svc/{0}/sync/{1}/{2}/{3}?hash={4}&sinceDateTime={5}'
        .format(storeKey, deviceKey, eventKey, uniqueId, hash, sinceDateTime);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  SyncUpdateTicketsAsync : function(storeKey, deviceKey, eventKey, uniqueId,
      objTickets, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/scanner.svc/{0}/sync/{1}/{2}/{3}'.format(
        storeKey, deviceKey, eventKey, uniqueId, objTickets);
    BWL.InvokeService('PUT', uri, objTickets, successCallback, errorCallback);
  },
  SyncInitialTicketsAsync : function(storeKey, deviceKey, eventKey, uniqueId,
      hash, compression, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/scanner.svc/{0}/init/{1}/{2}/{3}?hash={4}&compression={5}'
        .format(storeKey, deviceKey, eventKey, uniqueId, hash, compression);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.SearchIndexService = {
  SearchAsync : function(searchString, orderBy, page, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/searchindex.svc/search?q={0}&o={1}&p={2}'
        .format(searchString, orderBy, page);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  SearchTagsAsync : function(searchString, orderBy, page, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/searchindex.svc/tags?q={0}&o={1}&p={2}'.format(
        searchString, orderBy, page);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  SearchStoreAsync : function(storeKey, searchString, orderBy, page,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/searchindex.svc/{0}/search?q={1}&o={2}&p={3}'
        .format(storeKey, searchString, orderBy, page);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  SearchStoreTagsAsync : function(storeKey, searchString, orderBy, page,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/searchindex.svc/{0}/tags?q={1}&o={2}&p={3}'
        .format(storeKey, searchString, orderBy, page);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.StoreService = {
  ListStoresAsync : function(levels, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/store.svc/{0}'.format(levels);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  FindStoreKeyFromCustomURIAsync : function(customURI, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/store.svc/storeURL/{0}'.format(customURI);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  FindStoreKeyFromFacebookPageIdAsync : function(facebookPageId,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/store.svc/storeURL/facebookpage/{0}'
        .format(facebookPageId);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  FindCustomURIInfoFromFullURLAsync : function(fullURL, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/store.svc/customURIInfo?fullURL={0}'
        .format(fullURL);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  FindCustomURIInfoFromURIAsync : function(storeKey, URI, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/store.svc/customURI/{0}?URI={1}'.format(
        storeKey, URI);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.StoreAdminService = {
  GetTicketTemplateListAsync : function(storeKey, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/storeadmin.svc/{0}/TicketTemplateList'
        .format(storeKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  GetSystemFontListAsync : function(storeKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/storeadmin.svc/{0}/SystemFontList'
        .format(storeKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  GetPreviewTicketAsync : function(storeKey, ticketItemType, ticketItemKey,
      backgroundColorHex, fontColorHex, fontType, template, customImageKey,
      includeDetails, includeTerms, includeTicketImage, includeTicketName,
      horizontal, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/storeadmin.svc/{0}/PreviewTicket/{1}/{2}?backgroundColorHex={3}&fontColorHex={4}&fontType={5}&template={6}&customImageKey={7}&includeDetails={8}&includeTerms={9}&includeTicketImage={10}&includeTicketName={11}&horizontal={12}'
        .format(storeKey, ticketItemType, ticketItemKey, backgroundColorHex,
            fontColorHex, fontType, template, customImageKey, includeDetails,
            includeTerms, includeTicketImage, includeTicketName, horizontal);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.SystemProfileService = {
  GetProfileAsync : function(levels, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/{0}'.format(levels);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  SignupAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/systemprofile.svc/signup', null,
        successCallback, errorCallback);
  },
  RegisterAsync : function(requestedRole, objAccount, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/register/{0}'.format(
        requestedRole, objAccount);
    BWL.InvokeService('POST', uri, objAccount, successCallback, errorCallback);
  },
  ApproveRegisterAsync : function(email, approveToken, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/register/{1}?email={0}'
        .format(email, approveToken);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  VerifyEmailAsync : function(email, approveToken, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/verify/{1}?email={0}'.format(
        email, approveToken);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  LogonAsync : function(objAccount, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/logon'.format(objAccount);
    BWL.InvokeService('POST', uri, objAccount, successCallback, errorCallback);
  },
  LogoffAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET', '<%= at.urlApi %>/systemprofile.svc/logoff', null,
        successCallback, errorCallback);
  },
  ChangePasswordAsync : function(newPasswordHash, objAccount, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/changepass/{0}'.format(
        newPasswordHash, objAccount);
    BWL.InvokeService('POST', uri, objAccount, successCallback, errorCallback);
  },
  ResetPasswordAsync : function(objAccount, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/resetpass'.format(objAccount);
    BWL.InvokeService('POST', uri, objAccount, successCallback, errorCallback);
  },
  ApproveResetPasswordAsync : function(email, approveToken, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/resetpass/{1}?email={0}'
        .format(email, approveToken);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  AccessRequestAsync : function(type, key, requestedAccess, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/access/request/{0}/{1}/{2}'
        .format(type, key, requestedAccess);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  AccessRequestForAsync : function(type, key, profileKey, requestedAccess,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/access/requestfor/{0}/{1}/{2}/{3}'
        .format(type, key, profileKey, requestedAccess);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  AccessAddAsync : function(type, key, profileKey, access, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/access/add/{0}/{1}/{2}/{3}'
        .format(type, key, profileKey, access);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  AccessPendingAsync : function(successCallback, errorCallback) {
    BWL.InvokeService('GET',
        '<%= at.urlApi %>/systemprofile.svc/access/pending', null,
        successCallback, errorCallback);
  },
  AccessApproveAsync : function(key, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/access/approve/{0}'
        .format(key);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  AccessRejectAsync : function(key, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/systemprofile.svc/access/reject/{0}'
        .format(key);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  }
};
BWL.Services.UploadService = {
  UploadImageAsync : function(storeKey, uploadStream, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/upload.svc/{0}/image'.format(storeKey,
        uploadStream);
    BWL
        .InvokeService('POST', uri, uploadStream, successCallback,
            errorCallback);
  },
  UploadFileAsync : function(storeKey, uploadStream, successCallback,
      errorCallback) {
    var uri = '<%= at.urlApi %>/upload.svc/{0}/file'.format(storeKey,
        uploadStream);
    BWL
        .InvokeService('POST', uri, uploadStream, successCallback,
            errorCallback);
  }
};
BWL.Services.WishlistService = {
  GetWishlistAsync : function(storeKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/wishlist.svc/{0}'.format(storeKey);
    BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
  },
  ClearWishlistAsync : function(storeKey, successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/wishlist.svc/{0}'.format(storeKey);
    BWL.InvokeService('DELETE', uri, null, successCallback, errorCallback);
  },
  AddWishlistItemAsync : function(storeKey, itemTypeName, itemKey,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/wishlist.svc/{0}/{1}/{2}'.format(storeKey,
        itemTypeName, itemKey);
    BWL.InvokeService('PUT', uri, null, successCallback, errorCallback);
  },
  RemoveWishlistItemAsync : function(storeKey, itemTypeName, itemKey,
      successCallback, errorCallback) {
    var uri = '<%= at.urlApi %>/wishlist.svc/{0}/{1}/{2}'.format(storeKey,
        itemTypeName, itemKey);
    BWL.InvokeService('DELETE', uri, null, successCallback, errorCallback);
  }
};
