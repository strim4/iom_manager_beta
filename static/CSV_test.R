
library(readr)
library(jsonlite)
library(tidyr)
options(readr.num_columns = 0)



#Path needs to be adapted to local iom_manager/static directory
libDir <- "C:/Users/stmo/iom_manager/static"

#Input from r-script
list <- input[[1]]
#load EDF
csv <- paste(libDir, '/Median L.csv', sep='')


m <- read_delim(csv, ";", escape_double = FALSE, trim_ws = TRUE)

#Nur die Spalten der Kanalbezeichnung, Zeitstempel und der Signaldaten
TSignalAll = subset(m, select = -c(1:2, 4:10, 12:26))
TSignalAll$Timestamp <- factor(TSignalAll$Timestamp)
TSignalAll$Channel <- factor(TSignalAll$Channel)

#Tabelle von Wide to Long Form
data_long <- gather(TSignalAll, signal, value, '1/2400':'2400/2400', factor_key = TRUE)
Signals = subset(data_long, select = -c(3))
str(Signals)

##für Moritz
#####Datensatz für einen Zeitstempel mit allen Kanälen
t <- Signals[Signals$Timestamp=='20181106T135754,764',]
toJSON(t, force = TRUE)


