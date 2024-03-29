/*

1.2.1.	MD
1.2.2.	DO
1.2.3.	APRN
1.2.4.	LPN
1.2.5.	RN
1.2.6.	PA
1.2.7.	RPH
1.2.8.	EMT
1.2.9.	MA
1.2.10.	RPT
1.2.11.	PSI
1.2.12.	Other

*/
Insert into LOOKUP_TYPE (LOOKUP_TYPE_NAME,VALUE_MAX_LENGTH,DESCRIPTION_MAX_LENGTH,DESCRIPTION) values ('CLIN_SUFFIX',10,10,'Clinician Suffix List');
Insert into LOOKUP (LOOKUP_TYPE_NAME,LOOKUP_VALUE,DESCRIPTION,DISPLAY_SEQUENCE,DISPLAY_IND) values ('CLIN_SUFFIX','MD','MD',1,'Y');
Insert into LOOKUP (LOOKUP_TYPE_NAME,LOOKUP_VALUE,DESCRIPTION,DISPLAY_SEQUENCE,DISPLAY_IND) values ('CLIN_SUFFIX','DO','DO',2,'Y');
Insert into LOOKUP (LOOKUP_TYPE_NAME,LOOKUP_VALUE,DESCRIPTION,DISPLAY_SEQUENCE,DISPLAY_IND) values ('CLIN_SUFFIX','APRN','APRN',3,'Y');
Insert into LOOKUP (LOOKUP_TYPE_NAME,LOOKUP_VALUE,DESCRIPTION,DISPLAY_SEQUENCE,DISPLAY_IND) values ('CLIN_SUFFIX','LPN','LPN',4,'Y');
Insert into LOOKUP (LOOKUP_TYPE_NAME,LOOKUP_VALUE,DESCRIPTION,DISPLAY_SEQUENCE,DISPLAY_IND) values ('CLIN_SUFFIX','RN','RN',5,'Y');
Insert into LOOKUP (LOOKUP_TYPE_NAME,LOOKUP_VALUE,DESCRIPTION,DISPLAY_SEQUENCE,DISPLAY_IND) values ('CLIN_SUFFIX','PA','PA',6,'Y');
Insert into LOOKUP (LOOKUP_TYPE_NAME,LOOKUP_VALUE,DESCRIPTION,DISPLAY_SEQUENCE,DISPLAY_IND) values ('CLIN_SUFFIX','RPH','RPH',7,'Y');
Insert into LOOKUP (LOOKUP_TYPE_NAME,LOOKUP_VALUE,DESCRIPTION,DISPLAY_SEQUENCE,DISPLAY_IND) values ('CLIN_SUFFIX','EMT','EMT',8,'Y');
Insert into LOOKUP (LOOKUP_TYPE_NAME,LOOKUP_VALUE,DESCRIPTION,DISPLAY_SEQUENCE,DISPLAY_IND) values ('CLIN_SUFFIX','MA','MA',9,'Y');
Insert into LOOKUP (LOOKUP_TYPE_NAME,LOOKUP_VALUE,DESCRIPTION,DISPLAY_SEQUENCE,DISPLAY_IND) values ('CLIN_SUFFIX','RPT','RPT',10,'Y');
Insert into LOOKUP (LOOKUP_TYPE_NAME,LOOKUP_VALUE,DESCRIPTION,DISPLAY_SEQUENCE,DISPLAY_IND) values ('CLIN_SUFFIX','PSI','PSI',11,'Y');
Insert into LOOKUP (LOOKUP_TYPE_NAME,LOOKUP_VALUE,DESCRIPTION,DISPLAY_SEQUENCE,DISPLAY_IND) values ('CLIN_SUFFIX','Other','Other',12,'Y');
