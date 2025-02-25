package net.rnzonly.mtwo.utilities;


import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class JsonConverter {

    // Original method (no exclusions)
    public static String convertToJson(Object obj) throws Exception {
        return convertToJson(obj, new String[0]);
    }
    
    // New method - handle array of objects
    public static String convertToJson(Object[] objects) throws Exception {
        return convertArrayOfObjects(objects, new String[0]);
    }
    
    // New method - handle array of objects with exclusions
    public static String convertToJson(Object[] objects, String... excludeFields) throws Exception {
        return convertArrayOfObjects(objects, excludeFields);
    }

    // Varargs overload to specify fields to exclude
    public static String convertToJson(Object obj, String... excludeFields) throws Exception {
        if (obj == null) {
            return "null";
        }
        
        // Handle the case when obj is already an array but not Object[]
        if (obj.getClass().isArray() && !(obj instanceof Object[])) {
            return convertPrimitiveArray(obj, new HashSet<>(Arrays.asList(excludeFields)));
        }
        
        Set<String> exclusionSet = new HashSet<>(Arrays.asList(excludeFields));
        try {
            Class<?> clazz = obj.getClass();
            Field[] fields = clazz.getDeclaredFields();
            StringBuilder json = new StringBuilder("{");
            boolean firstField = true;

            for (Field field : fields) {
                // Skip if field is in exclusion set
                if (exclusionSet.contains(field.getName()) || field.getName().contains("this")) {
                    continue;
                }
                
                if (Modifier.isStatic(field.getModifiers())) {
                    continue; // Skip static fields
                }
                
                field.setAccessible(true);
                Object value = field.get(obj);
                
                // Skip null values
                if (value == null) {
                    continue;
                }
                
                String name = field.getName();

                if (!firstField) {
                    json.append(", ");
                } else {
                    firstField = false;
                }

                json.append("\"").append(name).append("\": ")
                    .append(convertValue(value, exclusionSet));
            }

            json.append("}");
            return json.toString();
        } catch (IllegalAccessException e) {
            throw new RuntimeException("Error converting object to JSON", e);
        }
    }

    // Helper method to convert an array of objects to JSON
    private static String convertArrayOfObjects(Object[] objects, String... excludeFields) throws Exception {
        Set<String> exclusionSet = new HashSet<>(Arrays.asList(excludeFields));
        StringBuilder json = new StringBuilder("[");
        boolean firstElement = true;
        
        for (Object obj : objects) {
            // Skip null values in arrays
            if (obj == null) {
                continue;
            }
            
            if (!firstElement) {
                json.append(", ");
            } else {
                firstElement = true;
            }
            
            try {
                json.append(convertValue(obj, exclusionSet));
                firstElement = false;
            } catch (IllegalAccessException e) {
                throw new RuntimeException("Error converting array element to JSON", e);
            }
        }
        
        json.append("]");
        return json.toString();
    }

    private static String convertValue(Object value, Set<String> exclusionSet) 
            throws Exception {
        if (value == null) {
            return "null";
        }

        Class<?> valueClass = value.getClass();

        if (valueClass.isArray()) {
            if (value instanceof Object[]) {
                return convertArrayOfObjects((Object[]) value, 
                        exclusionSet.toArray(new String[0]));
            } else {
                return convertPrimitiveArray(value, exclusionSet);
            }
        } else if (value instanceof String) {
            return "\"" + escapeJsonString((String) value) + "\"";
        } else if (value instanceof Number || value instanceof Boolean) {
            return value.toString();
        } else if (value instanceof Character) {
            return "\"" + escapeJsonString(value.toString()) + "\"";
        } else {
            // Recursively convert object, passing along the exclusion set
            return convertToJson(value, exclusionSet.toArray(new String[0]));
        }
    }

    private static String convertPrimitiveArray(Object array, Set<String> exclusionSet) 
            throws Exception {
        StringBuilder json = new StringBuilder("[");
        int length = Array.getLength(array);
        boolean firstElement = true;

        for (int i = 0; i < length; i++) {
            Object element = Array.get(array, i);
            
            // Skip null elements in arrays
            if (element == null) {
                continue;
            }
            
            if (!firstElement) {
                json.append(", ");
            } else {
                firstElement = true;
            }
            
            json.append(convertValue(element, exclusionSet));
            firstElement = false;
        }

        json.append("]");
        return json.toString();
    }

    private static String escapeJsonString(String input) {
        return input.replace("\\", "\\\\")
                   .replace("\"", "\\\"")
                   .replace("\b", "\\b")
                   .replace("\f", "\\f")
                   .replace("\n", "\\n")
                   .replace("\r", "\\r")
                   .replace("\t", "\\t");
    }
}
