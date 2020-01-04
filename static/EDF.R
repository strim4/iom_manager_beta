??edfReader
library(edfReader)
library(jsonlite)






#Path needs to be adapted to local iom_manager/static directory
libDir <- "C:/Users/stmo/iom_manager/static"

#Input from r-script
list <- input[[1]]

#load EDF
MEPtest <- paste(libDir, list$name, sep='')
CHdr <- readEdfHeader(MEPtest)

#read singals
TSignals <-readEdfSignals(CHdr, simplify=FALSE ,fragments = TRUE)
TSignals
#convert output to json
toJSON(TSignals, force = TRUE)

