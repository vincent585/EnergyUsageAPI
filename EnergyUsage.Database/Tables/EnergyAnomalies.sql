CREATE TABLE [dbo].[EnergyAnomalies]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Time] DATETIME NOT NULL, 
    [Consumption] DECIMAL(18,2) NOT NULL
)
