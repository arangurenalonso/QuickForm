import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/libs/ui/tabs';
import useDesigner from '@/modules/form/hooks/useDesigner';
import { useEffect, useMemo } from 'react';

const FieldSettingsPanel = () => {
  const { selectedField, handleSelectedField, sections } = useDesigner();

  const field = useMemo(() => {
    if (!selectedField) return null;

    const section = sections.find((s) => s.id === selectedField.sectionId);
    if (!section) return null;

    return section.fields.find((f) => f.id === selectedField.fieldId) ?? null;
  }, [selectedField, sections]);

  useEffect(() => {
    if (selectedField && !field) {
      handleSelectedField(null);
    }
  }, [selectedField, field, handleSelectedField]);

  if (!field) return null;

  const { render } = field;
  const { EditablePropsForm, RulesForm } = render;

  return (
    <Tabs defaultValue="editable" className="w-full h-full">
      <div className="grid h-full w-full grid-rows-[auto_1fr]  ">
        <TabsList className="flex-grow flex justify-center">
          <TabsTrigger value="editable">Properties</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
        </TabsList>

        <div className="min-h-0 w-full overflow-y-auto   ">
          <TabsContent value="editable">
            <EditablePropsForm formFieldConfig={field} />
          </TabsContent>
          <TabsContent value="rules">
            <RulesForm formFieldConfig={field} />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};

export default FieldSettingsPanel;
