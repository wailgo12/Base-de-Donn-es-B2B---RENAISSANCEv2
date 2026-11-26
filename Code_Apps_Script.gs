
function doPost(e) {
  var sheetName = 'Reseau_Vente_RENAISSANCE';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var headers = [
      "ID", "Date", "Agence", "Responsable", 
      "Téléphone", "WhatsApp", "E-mail", "Commune", "Agrément", 
      "Disponibilité", "Source", "Statut"
    ];
    sheet.appendRow(headers);
    sheet.getRange("A1:L1").setFontWeight("bold").setBackground("#E3000F").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, 12, 150);
  }

  try {
    var formData = e.parameter;
    var id = Utilities.getUuid();
    var date = new Date();
    
    var source = formData.utm_source || "Direct";
    if (formData.utm_campaign) {
      source = source + " (" + formData.utm_campaign + ")";
    }
    
    sheet.appendRow([
      id,
      date,
      formData.agence,
      formData.responsable,
      formData.telephone,
      formData.whatsapp,
      formData.email,
      formData.commune,
      formData.agrement,
      formData.disponibilite,
      source,
      "NOUVEAU"
    ]);

    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
