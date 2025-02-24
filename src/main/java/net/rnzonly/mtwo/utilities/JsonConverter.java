package net.rnzonly.mtwo.utilities;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class JsonConverter {

  public static String convertToJson(Object obj, String... excludeFields) {
    Set<String> exclusionSet = new HashSet<>(Arrays.asList(excludeFields));
    try {
      Class<?> clazz = obj.getClass();
      Field[] fields = clazz.getDeclaredFields();
      StringBuilder json = new StringBuilder("{");
      boolean firstField = true;

      for (Field field : fields) {
        if (exclusionSet.contains(field.getName()) || field.getName().contains("this")) {
          continue;
        }

        if (Modifier.isStatic(field.getModifiers())) {
          continue;
        }

        field.setAccessible(true);
        Object value = field.get(obj);
        String name = field.getName();

        if (!firstField) {
          json.append(", ");
        } else {
          firstField = false;
        }

        json.append("\"").append(name).append("\": ").append(
            convertValue(value, exclusionSet));
      }

      json.append("}");
      return json.toString();
    } catch (IllegalAccessException e) {
      throw new RuntimeException("Error converting object to JSON", e);
    }
  }

  public static String convertToJson(Object obj) {
    return convertToJson(obj, new String[0]);
  }

  private static String convertValue(Object value, Set<String> exclusionSet)
      throws IllegalAccessException {
    if (value == null) {
      return "null";
    }

    Class<?> valueClass = value.getClass();

    if (valueClass.isArray()) {
      return convertArray(value, exclusionSet);
    } else if (value instanceof String) {
      return "\"" + escapeJsonString((String)value) + "\"";
    } else if (value instanceof Number || value instanceof Boolean) {
      return value.toString();
    } else {
      // Recursively convert object, passing along the exclusion set
      return convertToJson(value, exclusionSet.toArray(new String[0]));
    }
  }

  private static String convertArray(Object array, Set<String> exclusionSet)
      throws IllegalAccessException {
    StringBuilder json = new StringBuilder("[");
    int length = Array.getLength(array);

    for (int i = 0; i < length; i++) {
      Object element = Array.get(array, i);
      json.append(convertValue(element, exclusionSet));

      if (i < length - 1) {
        json.append(", ");
      }
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
