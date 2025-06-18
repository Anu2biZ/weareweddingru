function doOptions(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);
  
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
  
  if (lock.hasLock()) {
    lock.releaseLock();
  }
  
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.TEXT)
    .setContent("")
    .setHeaders(headers);
}

function doGet(e) {
  return ContentService.createTextOutput('Success')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*');
}

function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    lock.waitLock(30000);
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    let data;
    
    try {
      Logger.log("Received postData: " + e.postData.contents);
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      Logger.log("Error parsing JSON: " + parseError);
      data = e.parameter;
      Logger.log("Using parameter data: " + JSON.stringify(data));
    }
    
    // Записываем заголовки, если таблица пустая
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Дата',
        'Имя и фамилия',
        'Количество гостей',
        'Статус'
      ]);
    }
    
    const now = new Date();
    
    sheet.appendRow([
      now.toLocaleString(),
      data.name || '',
      data.guests || '',
      data.status || ''
    ]);
    
    lock.releaseLock();
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Данные успешно сохранены' 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
  } catch (error) {
    Logger.log("Error: " + error.toString());
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error',
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({'Access-Control-Allow-Origin': '*'});
  }
}
