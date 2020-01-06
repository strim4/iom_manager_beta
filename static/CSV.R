
#Load required packages (The required packages must first be installed via R-Studio)
library(readr)
library(jsonlite)
library(tidyr)

#Suppress import messages, because the R-Script library would interpret them as output
options(readr.num_columns = 0)

#Path needs to be adapted to local iom_manager/static directory
libDir <- "C:/Users/stmo/iom_manager/static"

#Input from r-script (name of the csv-file)
list <- input[[1]]

#Load csv
csv <- paste(libDir, list$name, sep='')
m <- read_delim(csv, ";", escape_double = FALSE, trim_ws = TRUE)

#Select only the columns of channel designation, time stamp and signal data
TSignalAll = subset(m, select = -c(1:2, 4:10, 12:26))
TSignalAll$Timestamp <- factor(TSignalAll$Timestamp)
TSignalAll$Channel <- factor(TSignalAll$Channel)

#Reformat table from Wide to Long
data_long <- gather(TSignalAll, signal, value, '1/2400':'2400/2400', factor_key = TRUE)
Signals = subset(data_long, select = -c(3))
str(Signals)

#Select record with a specific timestamp
t <- Signals[Signals$Timestamp=='20181106T135754,764',]

##convert output to json
toJSON(t, force = TRUE)




