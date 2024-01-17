CREATE PROCEDURE [dbo].[Energy_GetAll]
AS
SELECT e.Time, e.Consumption FROM Energy e
