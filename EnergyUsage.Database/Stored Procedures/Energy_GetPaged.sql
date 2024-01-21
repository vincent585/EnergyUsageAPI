CREATE PROCEDURE dbo.Energy_GetPaged
    @PageSize INT,
    @Page INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@Page - 1) * @PageSize;
    
    SELECT
        Time,
        Consumption
    FROM
        Energy
    ORDER BY
        Time
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END;
