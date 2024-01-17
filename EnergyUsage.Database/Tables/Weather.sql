CREATE TABLE [dbo].[Weather]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Date] DATETIME NOT NULL, 
    [Temperature] FLOAT(24) NOT NULL, 
    [AverageHumidity] FLOAT(24) NOT NULL
)
