export interface TableColumn {
  name: string; // Nombre de la columna
  dataKey: string; // Nombre de la key del dato actual en esta columna
  isImage?: boolean; // La columna muestra una imagen?
  showDetailsButton?: boolean; // La columna tiene un boton para ver detalles?
  editButton?: boolean; // La columna tiene un boton para editar?
  deleteButton?: boolean; // La columna tiene un boton para eliminar?
  detailsUrl?: string;
  editUrl?: string;
  isSortable?: boolean; // Se puede ordenar la columna?
}
