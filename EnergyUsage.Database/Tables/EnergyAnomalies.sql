CREATE TABLE [dbo].[EnergyAnomalies]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Time] DATETIME NOT NULL, 
    [Consumption] DECIMAL(18,2) NOT NULL
)
