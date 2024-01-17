CREATE TABLE [dbo].[Weather]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Date] DATETIME NOT NULL, 
    [Temperature] DECIMAL(18,2) NOT NULL, 
    [AverageHumidity] DECIMAL(18,2) NOT NULL
)
